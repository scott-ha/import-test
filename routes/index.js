var express = require('express');
var router = express.Router();
const axios = require('axios').default;

router.get('/certifications', (req, res) => {
  res.render('iamport');
});
// "/certifications"에 대한 POST 요청을 처리하는 controller
router.post("/auth/certifications", async (req, res) => {
  const { imp_uid } = req.body; // request의 body에서 imp_uid 추출
  console.log('==========================');
  console.log(imp_uid);
  try {
    // 인증 토큰 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "4589353620567916", // REST API키
        imp_secret: "VGngRB9l80hsAE4RGEyrzJ4nsWbKri0nZoDRZMc8NtBn7FfNkNfUxjh0gtKHLL4L9HC9uOihiTFpzUdU" // REST API Secret
      }
    });
    const { access_token } = getToken.data.response; // 인증 토큰
    console.log('==========================');
    console.log(access_token);

    // // imp_uid로 인증 정보 조회
    const getCertifications = await axios({
      url: "https://api.iamport.kr/certifications/" + imp_uid, // imp_uid 전달
      method: "get", // GET method
      headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
    });
    const certificationsInfo = getCertifications.data.response; // 조회한 인증 정보
    console.log('==========================');
    console.log(certificationsInfo);

  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
