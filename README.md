<h1>
  <span>Todoit</span>
</h1>

<br/>
<div  align="center">
  <img width="60%" src="https://github.com/kimdonggu42/Todoit/assets/115632555/73bd5562-b80d-4b59-bf03-ce3951ed70437" alt="ipillu-logo">
</div>
</br>

## 프로젝트 소개

- **Todoit은 할 일을 등록하고 관리할 수 있는 서비스입니다.**

- 진행 기간 : 2023.05 ~ 2023.06

- 배포 링크 : [https://todoit-35f1e.web.app/](https://todoit-35f1e.web.app/)

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=REACT&logoColor=black"> <img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=for-the-badge&logo=REACT ROUTER&logoColor=white"> <img src="https://img.shields.io/badge/Context API-0C0C0E?style=for-the-badge&logo=REACT&logoColor=white"> <img src="https://img.shields.io/badge/Firebase Authentication-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> <img src="https://img.shields.io/badge/Firebase Firestore-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">

### Styling

<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

## 실행 방법

- 이 프로젝트는 Firebase에서 프로젝트 생성 시 발급받은 SDK key 값들을 `.env` 파일에서 관리하고 있습니다. 이로 인해 로컬에서의 구동은 어려울 수 있습니다.

```
$ git clone git@github.com:kimdonggu42/Todoit.git

$ npm install

$ npm start
```

## 디렉토리 구조

```
📦 src
 ┣ 📂 assets
 ┃ ┣ 📂 images
 ┃ ┗ 📂 style
 ┣ 📂 components
 ┣ 📂 context
 ┣ 📂 firebase
 ┣ 📂 hooks
 ┣ 📂 pages
 ┃ ┗ 📂 main
 ┣ 📂 recoil
 ┣ 📂 util
 ┣ 📜 App.tsx
 ┗ 📜 index.tsx
```

## 개발 내용

### 1. Firebase를 사용하여 프로젝트 리팩토링

- 기존 json server로 개발한 프로젝트를 Firebase의 Authentication과 Firestore를 사용하여 Serverless 서비스로 리팩토링을 진행 했습니다.

- onSnapshot() 메서드를 활용하여 데이터가 변경될 때마다 document snapshot을 업데이트하여 실시간으로 DB를 불러오도록 했습니다.

### 2. 사용자 행동에 따른 알림 처리

- react-toastify 라이브러리를 통해 사용자 행동에 따른 분기 처리를 통해 상황에 맞는 사용자 피드백을 줄 수 있도록 했습니다.

### 3. 서버 통신 로직 분리

- 서버와 통신하는 로직을 custom hook으로 만들어 UI 컴포넌트로부터 분리 및 반복되는 로직 최소화 했습니다.

## 시연 영상

|                                                      **회원가입**                                                      |                                                  **로그인/로그아웃**                                                   |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/41dd4611-0445-440a-b618-54a13e844ca6"/> | <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/2b9ab6f2-01d3-403f-ae04-1fd4c5f765f4"/> |
|                                                **할 일 등록/수정/삭제**                                                |                                                 **중요한 할 일 등록**                                                  |
| <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/40198d29-4ce3-46a6-9033-9c6a5c117484"/> | <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/652cc8b5-6362-44ca-92d5-2238a02df62b"/> |
|                                                  **할 일 완료 처리**                                                   |                                                       **반응형**                                                       |
| <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/f75fd720-d5f9-48fa-b58e-00e84585e8f0"/> | <img width="360px" src="https://github.com/kimdonggu42/Todoit/assets/115632555/666a4368-d3f7-4353-8594-120839823852"/> |
