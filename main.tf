# deploy app from container registry to aws lambda
# sns for emails
# dynamodb 
# cloudfront for cdn


provider "aws" {
  region = "us-east-1"
}

# iam role for lambda.
resource "aws_iam_role" "lambda_role" {
  name               = "function-role"
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
  name   = "function-logging-policy"
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
  role = aws_iam_role.lambda_role.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}

resource "aws_lambda_function" "abox-project-lambda" {
  function_name = "abox-project-lambda"
  role          = aws_iam_role.lambda_role.arn
  package_type  = "Image"
  image_uri     = "public.ecr.aws/t4u4m2y7/abox-project:${var.commit-ref}"
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
