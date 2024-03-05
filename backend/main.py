from distutils.log import debug 
from fileinput import filename 
from flask import *
import shutil
import os
import subprocess
app = Flask(__name__) 

upload_folder = 'uploads'
app.config['UPLOAD_FOLDER'] = upload_folder  # set configuration var to make the value of UPLOAD_FOLDER available thruout the Flask application

@app.route('/') 
def main(): 
	return render_template("index.html") 

@app.route('/upload', methods = ['POST']) 
def success(): 
	f = request.files['file'] 
	if f:
		if f.filename == '':
			f.filename = "Untitled"
		f.save(f.filename)
		file_copy = f"{os.path.splitext(f.filename)[0]}_copy{os.path.splitext(f.filename)[1]}"
		shutil.copy2(os.path.realpath(f.filename), os.path.realpath(file_copy))
		os.remove(f.filename)
		return render_template("ACK_run.html", name = f.filename)

@app.route('/run', methods = ['POST'])
def run():
	script = request.form.get('script_filename')
	if os.path.isfile(script):
		# with open("Physics_submissions.zst", 'r') as f:
			# try:
		subprocess.run(["python", script], input='physics_submissions.csv\nphysics_comments.csv', shell=True, text=True, check=True)
		return render_template("ACK_run.html", name = script)
		# except subprocess.CalledProcessError as e:
		# 	return render_template("error.html", message=f"Error running script: {e}")

if __name__ == '__main__': 
	app.run(debug=True)
