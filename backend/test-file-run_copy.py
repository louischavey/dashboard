argnum = 3
import sys

# Input method 1: CL args w/ sys.argv
# Run w/ script.py input_file.txt
sys.argv = ["user-alignment-kl-script_copy.py"]
arg1 = input()
sys.argv.append(arg1)
arg2 = input()
sys.argv.append(arg2)
print(sys.argv[1])
print(sys.argv[2])
print("test-file-run is running")
