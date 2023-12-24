#!/bin/bash
echo "" > combined.yaml
for file in *.yaml
do
  cat $file >> combined.yaml
  echo "---" >> combined.yaml
done
