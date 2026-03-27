import json
import os
import boto3


def handler(event: dict, context) -> dict:
    """Проверка и копирование файлов из chat_attachments в images/"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    action = params.get("action", "list")

    if action == "list":
        prefix = params.get("prefix", "")
        all_objects = []
        continuation_token = None

        while True:
            list_params = {"Bucket": "files"}
            if prefix:
                list_params["Prefix"] = prefix
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
            "body": json.dumps({"total": len(all_objects), "files": all_objects}),
        }

    elif action == "copy" and method == "POST":
        body = json.loads(event.get("body", "{}"))
        source_keys = body.get("source_keys", [])
        target_prefix = body.get("target_prefix", "images/")
        results = []

        for source_key in source_keys:
            filename = source_key.split("/")[-1]
            target_key = target_prefix + filename
            s3.copy_object(
                Bucket="files",
                CopySource={"Bucket": "files", "Key": source_key},
                Key=target_key,
            )
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{target_key}"
            results.append({"source": source_key, "target": target_key, "cdn_url": cdn_url})

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"copied": len(results), "results": results}),
        }

    return {
        "statusCode": 400,
        "headers": cors_headers,
        "body": json.dumps({"error": "Unknown action"}),
    }
