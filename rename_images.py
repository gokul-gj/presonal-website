
import os
import re

folder = "public/sequence"
files = sorted(os.listdir(folder))
pattern = re.compile(r"frame_(\d+)_")

for filename in files:
    match = pattern.search(filename)
    if match:
        index = int(match.group(1))
        new_name = f"{index:04d}.png"
        os.rename(os.path.join(folder, filename), os.path.join(folder, new_name))
        print(f"Renamed {filename} to {new_name}")
