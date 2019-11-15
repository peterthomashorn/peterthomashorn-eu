#!/bin/bash

set -e

rsync --recursive --delete --times --verbose dist/ uberspace:~/html/
