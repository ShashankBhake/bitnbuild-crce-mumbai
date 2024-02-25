
# PROJECT_ID = "quiet-subset-415315"  # @param {type:"string"}
# REGION = "asia-south1"  # @param {type: "string"}
# INPUT_BUCKET = f'{PROJECT_ID}_uploads'

@app.route("/")
def main():
    return "Welcome!"

@app.route('/how are you')
def hello():
    return 'I am good, how about you?'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
