from flask import Flask, render_template, request, abort
import os

app = Flask(__name__)

# Folder where your HTML files are stored
HTML_FOLDER = "templates"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        filename = request.form.get("filename")
        return display_page(filename)
    return '''
        <form method="post">
            <label>Enter HTML filename (without .html):</label><br>
            <input type="text" name="filename" required>
            <button type="submit">Show Page</button>
        </form>
    '''

@app.route("/page/<filename>")
def display_page(filename):
    safe_filename = f"{filename}.html"
    filepath = os.path.join(HTML_FOLDER, safe_filename)

    # Check that the file exists in templates
    if not os.path.exists(filepath):
        abort(404, description=f"Page '{safe_filename}' not found.")

    return render_template(safe_filename)

if __name__ == "__main__":
    app.run(debug=True)
