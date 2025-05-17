from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def luhn_checksum(card_number):
    def digits_of(n):
        return [int(d) for d in str(n)]
    digits = digits_of(card_number)
    odd_digits = digits[-1::-2]
    even_digits = digits[-2::-2]
    total = sum(odd_digits)
    for d in even_digits:
        total += sum(digits_of(d * 2))
    return total % 10

@app.route('/api/validate', methods=['POST'])
def validate_card():
    data = request.json
    number = data.get('card_number', '')
    is_valid = luhn_checksum(number) == 0
    return jsonify({'valid': is_valid})

if __name__ == '__main__':
    app.run(debug=True)
