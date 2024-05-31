function readCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function() {
            const text = reader.result;
            const data = parseCSV(text);
            displaySurvey(data);
        };
        reader.readAsText(input.files[0], 'UTF-8');
    }
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const questions = lines.map(line => {
        const values = line.split(',').map(value => value.trim());
        return values[0]; // 첫 번째 열이 설문 문항이라고 가정
    });
    return questions;
}

function displaySurvey(questions) {
    const container = document.getElementById('surveyContainer');
    container.innerHTML = ''; // 기존 내용 초기화
    questions.forEach((question, index) => {
        if (question) { // 비어 있지 않은 경우에만 표시
            let changedquestion = question.replace("_",",");
            const html = `
                <div class="question">
                    <p>${changedquestion}</p>
                    <div>
                        ${[1,2,3,4,5,6,7].map(num => `
                        <label><input type="radio" name="question${index}" value="${num}"> ${num}</label>
                        `).join('')}
                    </div>
                </div>
            `;
            container.innerHTML += html;
        }
    });
}
