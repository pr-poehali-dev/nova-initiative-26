import json
import os
import boto3


def handler(event: dict, context) -> dict:
    """Проверка файлов в S3 хранилище"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    # Handle CORS preflight
    method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method", "GET")
    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"message": "OK"}),
        }

    try:
        s3 = boto3.client(
            "s3",
            endpoint_url="https://bucket.poehali.dev",
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
        )

        all_objects = []
        continuation_token = None

        while True:
            list_params = {"Bucket": "files"}
            if continuation_token:
                list_params["ContinuationToken"] = continuation_token

            response = s3.list_objects_v2(**list_params)

            contents = response.get("Contents", [])
            for obj in contents:
                all_objects.append({
                    "key": obj["Key"],
                    "size": obj["Size"],
                    "last_modified": obj["LastModified"].isoformat(),
                })

            if response.get("IsTruncated"):
                continuation_token = response.get("NextContinuationToken")
            else:
                break

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "total": len(all_objects),
                "files": all_objects,
            }),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "error": str(e),
            }),
        }
