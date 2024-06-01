import React, { useState, useEffect, useRef } from 'react';
import './chatBotPage.css';
import Modal from './modal.js';

function ChatBot() {
  const [userInput, setUserInput] = useState(''); // 사용자의 입력을 저장하는 상태
  const [chat, setChat] = useState([]); // 채팅 내용을 저장하는 상태
  const [userResponses, setUserResponses] = useState([]); // 사용자의 답변을 저장하는 상태
  const chatWindowRef = useRef(null); // 채팅창을 자동으로 스크롤하는데 사용되는 useRef
  let [questionCount, setQuestionCount] = useState(1); // 질문 카운트를 저장하는 상태
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 인덱스를 저장하는 상태
  const [loading, setLoading] = useState(false); // 로딩 여부를 저장하는 상태
  const [questionData, setQuestionData] = useState([]); // 공통질문 생성 곳간
  const [questionDataCount, setQuestionDataCount] = useState("");
  let [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  let [formattedQuestionList, setFormattedQuestionList] = useState([]);

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
      alert('내용을 입력해주세요!');
      setUserInput('');
      return;
    } else if (userInput !== '생성' && userInput !== '수정') {
      alert('"생성" 또는 "수정"만 입력해주세요!');
      setUserInput('');
      return;
    }

    const currentTime = formatTime(); // 현재 시간을 가져옴

    setUserInput('');

    const apiUrl = '/api/8582/self-introduction';
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
          if (userInput === '생성') {
            const formattedMessage = data1.message.replace(/\n/g, '<br>');
            const formattedQuestionList = data1.questionList.map((question) => question.replace(/\n/g, '<br>'));
            setChat((prevChat) => [
              ...prevChat,
              { type: 'user', text: userInput, time: currentTime },
              { type: 'bot', text: <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />, time: currentTime },
              ...formattedQuestionList.map((question, index) => ({ type: 'bot', text: <div key={index} dangerouslySetInnerHTML={{ __html: question }} />, time: currentTime })),
            ]);
            setQuestionCount(2); // 두 번째 질문으로 넘어가기 위한 상태 변경
          } else if (userInput === '수정') {
            const formattedQuestionList = data1.questionList.map((question) => question.replace(/\n/g, '<br>'));
            console.log(data1.questionList)
            // '수정' 모드에서 첫 번째 질문을 채팅창에 표시
            handleSendMessageModify(formattedQuestionList); // 수정 모드일 때만 handleSendMessageModify() 호출
          }
        }, 500); // 0.5초 지연
      })
      .catch((error) => console.error('Error:', error));
  }

  function handleSendMessageModify(formattedQuestionList) {
    const currentTime = formatTime(); // 현재 시간을 가져옴

    // 사용자 입력 메시지와 시간 추가
    setChat((prevChat) => [...prevChat, { type: 'user', text: userInput, time: currentTime }]);

    // 사용자 응답을 userResponses 상태에 추가
    if (userInput.trim()) {
        setUserResponses((prevResponses) => [...prevResponses, userInput]);
    }

    setUserInput('');

    if (currentMessageIndex < formattedQuestionList.length) {
        setTimeout(() => {
            setChat((prevChat) => [
                ...prevChat,
                { type: 'bot', text: formattedQuestionList[currentMessageIndex], time: currentTime },
            ]);

            setCurrentMessageIndex((prevIndex) => prevIndex + 1);
            setFormattedQuestionList(formattedQuestionList);
            setQuestionCount(4);
        }, 1000);
    } else {
        console.log('모든 수정 질문에 대한 응답이 완료되었습니다.');

        setLoading(true);

        setUserResponses((prevResponses) => {
            const updatedResponses = [...prevResponses];

            const allJson = {
                question: updatedResponses,
            };

            console.log(allJson);

            const apiUrl = '/api/8582/set-unifot';

            setTimeout(() => {
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(allJson),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);

                        if (data.answer) {
                            const formattedAnswer = data.answer.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ));

                            setChat((prevChat) => [...prevChat, { type: 'bot', text: formattedAnswer }]);
                        } else {
                            setChat((prevChat) => [
                                ...prevChat,
                                {
                                    type: 'bot',
                                    text: 'The response could not be processed properly. Please try again.',
                                    time: formatTime(),
                                },
                            ]);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);

                        setChat((prevChat) => [
                            ...prevChat,
                            { type: 'bot', text: 'There was an error processing your request. Please try again.', time: currentTime },
                        ]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, 1000);

            return updatedResponses;
        });
    }
}

  function handleSendMessageSecond() {
    if (!userInput.trim()) {
      alert('내용을 입력해주세요!');
      setUserInput('');
      return;
    } else if (userInput !== '1' && userInput !== '2') {
      alert('숫자 1 또는 2만 입력해주세요!');
      setUserInput('');
      return;
    }
    
    setQuestionDataCount(userInput);
    setQuestionCount(3);
    let tmp = userInput;

    // 서버에 두 번째 질문에 대한 사용자 입력값을 POST 요청
    fetch('/api/8582/self-introduction/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserSelectedType: tmp }),
    })
        .then((response2) => response2.json())
        .then((data2) => {
            const currentTime = formatTime();
            // 사용자 입력 메시지와 시간 추가
            setChat((prevChat) => [...prevChat, { type: 'user', text: userInput, time: currentTime }]);

            setTimeout(() => {
                setQuestionData(data2.message);

                setChat((prevChat) => [
                    ...prevChat,
                    { type: 'bot', text: data2.message[questionIndex] },
                    { type: 'bot', text: data2.message[questionIndex + 1], time: currentTime },
                ]);

                setQuestionIndex((prevIndex) => prevIndex + 2);
            }, 1000); // 1초 후 실행
            setUserInput('');
        })
        .catch((error) => console.error('Error:', error));
}

function handleProcessQuestionResponse() {
    if (questionData) {
        const currentTime = formatTime();
        // 사용자의 이전 응답 메시지 추가
        setChat((prevChat) => [
            ...prevChat,
            { type: 'user', text: userInput, time: currentTime },
        ]);

        // 사용자 응답값을 저장
        setUserResponses((prevResponses) => {
            const updatedResponses = [...prevResponses, userInput];

            // 마지막 질문에 도달한 경우 서버로 전송
            if (questionIndex === questionData.length) {
                console.log(updatedResponses);

                let allJson = {
                    problemNumber: questionDataCount,
                    question: updatedResponses,
                };

                // 로딩 상태 설정
                setLoading(true);

                // 서버 주소를 담을 변수 선언
                let apiUrl = '/api/8582/unifot';

                // apiUrl을 사용하여 서버에 POST 요청 보내기
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify(allJson),
                })
                    .then((response3) => response3.json())
                    .then((data3) => {
                        console.log(data3);
                        console.log(apiUrl);
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
                        setLoading(false); // API 호출이 완료되면 로딩 상태를 false로 설정
                    });
            }

            return updatedResponses;
        });

        // 다음 질문이 있는 경우 해당 메시지 추가
        if (questionIndex < questionData.length) {
            setTimeout(() => { // 1초 지연을 위해 setTimeout 사용
                const currentTime = formatTime();
                setChat((prevChat) => [
                    ...prevChat,
                    { type: 'bot', text: questionData[questionIndex], time: currentTime },
                ]);
                setQuestionIndex((prevIndex) => prevIndex + 1);
            }, 1000); // 1초 후 실행
        }

        setUserInput('');
    }
}

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
    } else if (questionCount === 4) {
      handleSendMessageModify(formattedQuestionList);
    }
  }

  // 모달 닫기 함수
  function closeModal() {
    // 모달 및 로딩 상태를 닫거나 초기화
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
          placeholder="내용을 작성해주세요!"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleSendButtonClick}>전송</button>
      </div>

      {/* 모달 표시 */}
      {loading && (
        <div className="modal">
          <div className="modalContent">
            <Modal closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;