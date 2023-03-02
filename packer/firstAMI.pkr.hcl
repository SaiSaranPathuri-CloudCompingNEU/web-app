variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-0dfcb1ef8550277af"
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"
}

variable "vpc_id" {
  type    = string
  default = "vpc-06cf7e50f82f4ee4d"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0cf4d8ac186a7eaa7"
}

variable "profile" {
  type = string
  default = "dev"
}

variable "ami_users" {
  type = list(string)
  default = ["413149706948"]
}


variable "ami_regions" {
  type = list(string)
  default = ["us-east-1"]

}

packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "my-ami" {

  profile       = var.profile
  ami_name      = "AMAZON_AWS_AMI_{{timestamp}}"
  instance_type = "t2.micro"
  source_ami    = var.source_ami
  region        = var.aws_region
  ssh_username = var.ssh_username
  subnet_id    = var.subnet_id
  vpc_id        = var.vpc_id
  ami_users     = var.ami_users
  ami_regions   = var.ami_regions

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  name    = "AMI build"
  sources = ["source.amazon-ebs.my-ami"]
  provisioner "file" {
    source      = "dist/webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }
  provisioner "file" {
    source      = "./packer/webapp.service"
    destination = "/home/ec2-user/webapp.service"
  }
  provisioner "shell" {
    script = "./packer/script.sh"

  }
}
