provider "google" {
  project = "platzi-369622"
  region  = "us-west4"
  zone    = "us-west4-b"
}

resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance2"
  machine_type = "e2-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    # A default network is created for all GCP projects
    network = "default"
    access_config {
    }
  }
}

resource "google_compute_network" "vpc_network" {
  name                    = "terraform-network"
  auto_create_subnetworks = "true"
}
