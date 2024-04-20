# deploy app from container registry to aws lambda
# sns for emails
# dynamodb 
# cloudfront for cdn

terraform {
  cloud {
    organization = "yusufa22"
    workspaces { name = "abox-project-workspace" }
  }
}

provider "aws" {
  region = "us-east-1"
}

# iam role for lambda.
resource "aws_iam_role" "lambda_role" {
  name = "function-role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : "sts:AssumeRole",
        Effect : "Allow",
        Principal : {
          "Service" : "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# iam policy for lambda role
resource "aws_iam_policy" "function_logging_policy" {
  name = "function-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
  role       = aws_iam_role.lambda_role.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}

resource "aws_lambda_function" "abox-project-lambda" {
  function_name = "abox-project-lambda"
  role          = aws_iam_role.lambda_role.arn
  package_type  = "Image"
  image_uri     = "${var.ecr-repo-uri}:${var.commit-ref}"
}

resource "aws_lambda_function_url" "abox-project-lambda-aws_lambda_function_url" {
  function_name      = aws_lambda_function.abox-project-lambda.function_name
  authorization_type = "NONE"
}

# cloudwatch log group for lambda.
resource "aws_cloudwatch_log_group" "function_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.abox-project-lambda.function_name}"
  retention_in_days = 7
  lifecycle {
    prevent_destroy = false
  }
}

#cloudfront disribution for giving lambda a custom domain name

data "aws_acm_certificate" "cert-domain" {
  domain   = "abox-project.xyz"
}

locals {
    my-origin-id = "abox-project-lambda-disribution-origin"
}

resource "aws_cloudfront_distribution" "abox-project-lambda-disribution" {
  aliases = ["abox-project.xyz"]
  origin {
    domain_name = replace(replace(aws_lambda_function_url.abox-project-lambda-aws_lambda_function_url.function_url, "https://", ""), "/", "")
    origin_id = local.my-origin-id
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1.2"]
    }
  }
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.my-origin-id
    viewer_protocol_policy = "redirect-to-https"
  }
  enabled = true
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  }
  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert-domain.arn
    ssl_support_method = "sni-only"
  }
}