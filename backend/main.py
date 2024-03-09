from distutils.log import debug 
from fileinput import filename 
from flask import *
import shutil
import os
import subprocess
import json 
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__) 
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['CORS_HEADERS'] = 'Content-Type'
upload_folder = 'uploads'
app.config['UPLOAD_FOLDER'] = upload_folder  # set configuration var to make the value of UPLOAD_FOLDER available thruout the Flask application

def getArgNum(s: str):
	numArgs = 0 

	print("here")
	with open(s, "r") as f: 
		lines = f.readlines() 
		first_line = lines[0] 
		tokens = first_line.split(" ") 
		numArgs = int(tokens[-1]) 

	return numArgs

@app.route('/') 
@cross_origin()
def main(): 
	return render_template("index.html") 

@app.route('/upload', methods = ['POST']) 
@cross_origin()
def success(): 
	f = request.files['file'] 
	if f:
		if f.filename == '':
			f.filename = "Untitled"
		f.save(f.filename)
		file_copy = f"{os.path.splitext(f.filename)[0]}_copy{os.path.splitext(f.filename)[1]}"
		shutil.copy2(os.path.realpath(f.filename), os.path.realpath(file_copy))
		os.remove(f.filename)
		# print(final)
		return jsonify(success=True, message=f"Script ran successfully")

@app.route('/get_inputs', methods = ['POST'])
@cross_origin()
def get_inputs():
	script = request.get_json(force=True)
	script = script["filename"]
	print(script)
	# print("THIS IS MY SCRIPT: "+ script)
	if os.path.isfile(script):
		try: 
			argNum = getArgNum(script)
			print(argNum)
			data = {"success": True, "argNum": argNum}
			final = jsonify(data)
			final.status_code = 200
			return final
		except subprocess.CalledProcessError as e:
			print("womp womp")
			return jsonify(success=False, message=f"Error running script: {e}")
		
@app.route('/run', methods = ['POST'])
@cross_origin()
def run():
	script = request.get_json(force=True)
	filename = script["filename"]
	input_string = script['inputData']
	if os.path.isfile(filename):
		try: 
			subprocess.run(["python", filename], input=input_string, shell=True, text=True, check=True)
			return jsonify(success=True, message=f"Script ran successfully")
		except subprocess.CalledProcessError as e:
			print("womp womp")
			return jsonify(success=False, message=f"Error running script: {e}")



if __name__ == '__main__': 
	app.run(debug=True)