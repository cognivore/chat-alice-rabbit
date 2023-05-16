#!/usr/bin/env bash

wget "https://github.com/getzola/zola/releases/download/v0.16.1/zola-v0.16.1-x86_64-unknown-linux-gnu.tar.gz" -O zola.tar.gz
tar xzvf zola.tar.gz
rm zola.tar.gz

chmod +x zola
