# set up ses
# deploy app from container registry to ecs

# provider "aws"{
#   region = "use-east-1"
# }

# resource "aws_ecs_cluster" "abox_cluster" {
#   name = "abox-project" # Name your cluster here
# }

# resource "aws_ecs_task_definition" "app_task" {
#   family                   = "abox-project-task"
#   container_definitions    = jsonencode([{
#       "name": "app-first-task",
#       "image": "https://hub.docker.com/repository/docker/yusufa22/abox-project:${var.commit-ref}",
#       "essential": true,
#       "portMappings": [
#         {
#           "containerPort": 80,
#           "hostPort": 3000
#         }
#       ],
#       "memory": 512,
#       "cpu": 256
#     }])
#   requires_compatibilities = ["FARGATE"] # use Fargate as the launch type
#   network_mode             = "awsvpc"    # add the AWS VPN network mode as this is required for Fargate
#   memory                   = 512         # Specify the memory the container requires
#   cpu                      = 256         # Specify the CPU the container requires
#   execution_role_arn       = ""
# }