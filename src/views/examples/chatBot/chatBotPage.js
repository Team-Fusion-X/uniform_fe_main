import React, { useState, useEffect, useRef } from 'react';
import './chatBotPage.css';
import Modal1 from './modal1.js';
import Modal2 from './modal2.js';
import Modal3 from './modal3.js';

function ChatBot() {
  const [userInput, setUserInput] = useState(''); // 사용자의 입력을 저장하는 상태
  const [chat, setChat] = useState([]); // 채팅 내용을 저장하는 상태
  const [userResponses, setUserResponses] = useState([]); // 사용자의 답변을 저장하는 상태
  const chatWindowRef = useRef(null); // 채팅창을 자동으로 스크롤하는데 사용되는 useRef
  const [showCompetitionModal, setShowCompetitionModal] = useState(false); // 공모전 모달 표시 여부
  const [showActivityModal, setShowActivityModal] = useState(false); // 교과활동 모달 표시 여부
  let [questionCount, setQuestionCount] = useState(1); // 질문 카운트를 저장하는 상태
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 인덱스를 저장하는 상태
  const [loading, setLoading] = useState(false); // 로딩 여부를 저장하는 상태
  const [questionData, setQuestionData] = useState([]); // 공통질문 생성 곳간
  const [questionDataCount, setQuestionDataCount] = useState("");
  const [firstQuestion, setFirstQuestion] = useState('');

  // 채팅창이 업데이트될 때 자동으로 스크롤을 아래로 이동시키는 useEffect
  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  // 처음 페이지 로딩 시에만 실행되는 useEffect
  useEffect(() => {
    const welcomeMessage =
      '자기소개서에 대해 도움을 드리겠습니다. 생성, 수정 중 하나를 입력해주세요!';
    const currentTime = formatTime(); // 현재 시간을 가져옴
    setChat([{ type: 'bot', text: welcomeMessage, time: currentTime }]);
  }, []);

  useEffect(() => {
    console.log(`현재 인덱스: ${questionIndex}`);
    console.log('length:', questionData.length)
    // `questionCount`가 2로 변경된 후에 필요한 로직을 여기에 추가
  }, [questionIndex]);

  useEffect(() => {
    console.log(`유저 응답: ${userResponses}`);
    // `questionCount`가 2로 변경된 후에 필요한 로직을 여기에 추가
  }, [userResponses]);

  // 시간 함수
  function formatTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // 사용자 입력값 변경 시 호출되는 함수
  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  // 메시지 전송 버튼 클릭 시 호출되는 함수
  function handleSendMessage() {
    // 입력값이 공백인 경우 함수 종료
    if (!userInput.trim()) {
      return;
    }

    const currentTime = formatTime(); // 현재 시간을 가져옴
    // 사용자 입력 메시지와 시간 추가
    setChat((prevChat) => [...prevChat, { type: 'user', text: userInput, time: currentTime }]);
    setUserInput('');

    const apiUrl = 'http://orion.mokpo.ac.kr:8582/api/self-introduction';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ UserSelectedType: userInput }),
    })
      .then((response) => response.json())
      .then((data1) => {
        // 채팅창에 메시지 및 질문 리스트 추가
        setTimeout(() => {
          // 메시지와 질문 리스트의 개행 문자를 처리
          const formattedMessage = data1.message.replace(/\n/g, '<br>');
          const formattedQuestionList = data1.questionList.map((question) => question.replace(/\n/g, '<br>'));
          setQuestionCount(2); // 두 번째 질문으로 넘어가기 위한 상태 변경

          if (userInput === '생성') {
            setFirstQuestion('생성');
            setChat((prevChat) => [
              ...prevChat,
              { type: 'bot', text: <div dangerouslySetInnerHTML={{ __html: formattedMessage }} /> },
              ...formattedQuestionList.map((question, index) => ({ type: 'bot', text: <div key={index} dangerouslySetInnerHTML={{ __html: question }} /> })),
            ]);
          } 
          else {
            setFirstQuestion('수정');
            setChat((prevChat) => [
              ...prevChat,
              ...formattedQuestionList.map((question, index) => ({ type: 'bot', text: <div key={index} dangerouslySetInnerHTML={{ __html: question }} /> })),
            ]);
          }
        }, 1000); // 1초 지연
      })
      .catch((error) => console.error('Error:', error));
  }

  function handleSendMessageSecond() {
    if (!userInput.trim()) {
      return;
    }
    setQuestionDataCount(userInput);
    setQuestionCount(3);
    let tmp = userInput;
    // 서버에 두 번째 질문에 대한 사용자 입력값을 POST 요청
    fetch('http://orion.mokpo.ac.kr:8582/api/self-introduction/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserSelectedType: tmp}),
    })
      .then((response2) => response2.json())
      .then((data2) => {
        const currentTime = formatTime();
        // 사용자 입력 메시지와 시간 추가
        setChat((prevChat) => [...prevChat, { type: 'user', text: userInput, time: currentTime }]);
        setQuestionData(data2.message);

        setChat((prevChat) => [
          ...prevChat,
          { type: 'bot', text: data2.message[questionIndex] },
          { type: 'bot', text: data2.message[questionIndex + 1] },
        ]);

        setQuestionIndex(questionIndex + 2);
        setUserInput('');
      })
      .catch((error) => console.error('Error:', error));
  }

  function handleProcessQuestionResponse() {
    if (questionData) {
      // 사용자의 이전 응답 메시지 추가
      setChat((prevChat) => [
        ...prevChat,
        { type: 'user', text: userInput },
      ]);

      // 다음 질문이 있는 경우 해당 메시지 추가
      if (questionIndex < questionData.length) {
        setChat((prevChat) => [
          ...prevChat,
          { type: 'bot', text: questionData[questionIndex] },
        ]);
        setQuestionIndex(questionIndex + 1);
      }

      // 사용자 응답값을 저장
      setUserResponses((prevResponses) => [
        ...prevResponses,
        userInput,
      ]);

      setUserInput('');

      // 마지막 질문에 도달한 경우 서버로 전송
      if (questionIndex === questionData.length) {
        const allJson = {
          problemNumber: questionDataCount,
          question: userResponses,
        };

        // 로딩 상태 설정
        setLoading(true);

        // 서버 주소를 담을 변수 선언
        let apiUrl = '';

        // userInput에 따라 적절한 API 엔드포인트를 apiUrl 변수에 할당
        if (firstQuestion === "생성") {
          apiUrl = 'http://orion.mokpo.ac.kr:8582/api/unifot';
        } else if (firstQuestion === "수정") {
          apiUrl = 'http://orion.mokpo.ac.kr:8582/api/set-unifot';
        }

        // apiUrl을 사용하여 서버에 POST 요청 보내기
        fetch('http://orion.mokpo.ac.kr:8582/api/unifot', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({ allJson }),
        })
          .then((response3) => response3.json())
          .then((data3) => {
            console.log(data3)
            console.log(apiUrl)
            // JSX에서 개행 문자를 <br>로 바꾸어 출력
            const formattedAnswer = data3.answer.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ));

            // 채팅창에 서버 응답 추가  
            setChat((prevChat) => [...prevChat, { type: 'bot', text: formattedAnswer }]);
          })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
            setLoading(false); // 'unifot' API 호출이 완료되면 loading 상태를 false로 설정
          });
      }
    }
  };

  // 엔터 키를 눌렀을 때 메시지 전송
  function handleInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터 동작을 막음
      handleSendButtonClick();
    }
  }

  // 전송버튼을 눌렀을 때 메시지 전송
  function handleSendButtonClick() {
    if (questionCount === 1) {
      handleSendMessage();
    } else if (questionCount === 2) {
      handleSendMessageSecond();
    } else if (questionCount === 3) {
      handleProcessQuestionResponse();
    }
  }


  // 페이지 새로고침 버튼 클릭 시 초기화
  function handleRefresh() {
    // 현재 채팅 및 사용자 입력 초기화
    setChat([]);
    setUserInput('');

    // 환영 메시지 추가 및 채팅창 초기화
    const welcomeMessage = '자기소개서에 대해 도움을 드리겠습니다. 생성, 수정 중 하나를 입력해주세요!';
    setChat([{ type: 'bot', text: welcomeMessage }]);
  }

  // 모달 닫기 함수
  function closeModal() {
    // 각각의 모달 및 로딩 상태를 닫거나 초기화
    setShowActivityModal(false);
    setShowCompetitionModal(false);
    setLoading(false);
  }

  return (
    <div className="chatBotPage">
      <div className="chatWindow" ref={chatWindowRef}>
        {chat.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="messageText">{message.text}</div>
            <div className="messageTime">{message.time}</div>
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="질문을 입력해주세요!"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleSendButtonClick}>전송</button>
        <button onClick={handleRefresh} className="refreshButton">
          새로고침
        </button>
      </div>

      {/* 모달 표시 */}
      {showActivityModal && (
        <div className="modal">
          <div className="modalContent">
            <Modal2 closeModal={closeModal} />
          </div>
        </div>
      )}

      {showCompetitionModal && (
        <div className="modal">
          <div className="modalContent">
            <Modal1 closeModal={closeModal} />
          </div>
        </div>
      )}

      {loading && (
        <div className="modal">
          <div className="modalContent">
            <Modal3 closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
