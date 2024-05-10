from flask import Flask, request, jsonify

app = Flask(__name__)

# 간단한 합격률 계산 함수
def calculate_acceptance_rate(field, school, major, keyword):
    # 실제 로직은 복잡할 수 있으며 여기서는 단순화하여 처리 -> 합격률 80이라 가정
    return 80

@app.route('/api/acceptance_rate', methods=['POST'])
def get_acceptance_rate():
    data = request.get_json()
    field = data['field']
    school = data['school']
    major = data['major']
    keyword = data['keyword']
    
    acceptance_rate = calculate_acceptance_rate(field, school, major, keyword)
    return jsonify({'acceptance_rate': acceptance_rate})
if __name__ == '__main__':
    app.run(debug=True)
