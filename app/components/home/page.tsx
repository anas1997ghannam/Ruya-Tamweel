// "use client";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   Box,
//   Typography,
//   Container,
//   Button,
//   useTheme,
//   Fade,
// } from "@mui/material";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [phraseIndex, setPhraseIndex] = useState(0);
//   const theme = useTheme();
//   const items = [
//     { img: "/images/bg1.jpg" },
//     { img: "/images/bg2.jpeg" },
//     { img: "/images/bg3.jpeg" },
//     { img: "/images/bg4.jpeg" },
//     { img: "/images/logo.jpg" },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     fade: false,
//   };
//   const phrases = [
//     "ابدأ رحلتك الاستثمارية",
//     "ادعم فكرة اليوم، مشروع الغد",
//     "معًا نحو المستقبل",
//     "رؤية تصنع الفرق",
//     "تمويل يحقق الطموح",
//     "معاً نحو المستقبل...بفكرة وتمويل",
//   ];
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPhraseIndex((prev) => (prev + 1) % phrases.length);
//     }, 3000); // تغيير كل 3 ثوانٍ
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
//       {/* Slider */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <Slider {...settings}>
//           {items.map((item, index) => (
//             <Box key={index}>
//               <img
//                 src={item.img}
//                 alt={`slide-${index}`}
//                 style={{
//                   width: "100%",
//                   height: "100vh",
//                   objectFit: "cover",
//                   filter: "brightness(0.6)",
//                 }}
//               />
//             </Box>
//           ))}
//         </Slider>
//       </Box>

//       {/* Content Above Slider */}
//       <Container
//         sx={{
//           position: "relative",
//           zIndex: 1,
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             background: "rgba(0,0,0,0.4)",
//             padding: "40px",
//             borderRadius: "20px",
//           }}
//         >
//           <Typography variant="h2" sx={{ color: "white", textAlign: "center" }}>
//             رؤية وتمويل
//           </Typography>
//           {/* العبارات المتغيرة */}
//           <Fade in key={phraseIndex} timeout={1000}>
//             <Typography
//               variant="h6"
//               sx={{ color: "#ccc", minHeight: "30px", textAlign: "center" }}
//             >
//               {phrases[phraseIndex]}
//             </Typography>
//           </Fade>
//           <Box display="flex" gap={2} justifyContent="center" mt={3}>
//             <Link href="/login?role=investor">
//               <Button variant="contained">كمستثمر</Button>
//             </Link>
//             <Link href="/login?role=entrepreneur">
//               <Button variant="outlined">كرائد أعمال</Button>
//             </Link>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
"use client";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  Fade,
} from "@mui/material";
import { keyframes } from "@emotion/react"; // لاستخدام Keyframes في MUI
import Link from "next/link";
import { useState, useEffect } from "react";

interface AnimatedLineSimpleProps {
  delay: number;
  duration: number;
  left: string;
  height: string; // ستبقى كنص لأنها قد تحتوي على "px" أو "%"
  color: string;
}

// تعريف Keyframes لحركة الخطوط
const simpleMoveUp = keyframes`0% {
    transform: translateY(0px);
    opacity: 0;
  }
  20% {
    opacity: 0.6; /* شفافية الخط القصوى خلال الظهور */
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-110vh); /* تحريك الخط للأعلى خارج الشاشة */
    opacity: 0;
  }`;
// مكون الخط المتحرك الواحد
const AnimatedLineSimple = ({
  delay,
  duration,
  left,
  height,
  color,
}: AnimatedLineSimpleProps) => (
  <Box
    sx={{
      position: "absolute",
      left: left,
      // يبدأ الخط من أسفل الشاشة مع أخذ ارتفاعه في الاعتبار
      bottom: -`${parseFloat(height) + 10}px`,
      width: "1.5px", // سماكة الخط
      height: height,
      backgroundColor: color,
      opacity: 0, // الشفافية الأولية (الأنيميشن سيتولى التحكم بها)
      animation: `${simpleMoveUp} ${duration}s linear ${delay}s infinite`,
    }}
  />
);

// مكون الخلفية المتحركة بالخطوط
const AnimatedLinesBackground = () => {
  const theme = useTheme();
  // يمكنك تغيير هذا اللون لاحقًا بسهولة
  const tealColor = "rgba(79, 76, 76, 0.74)";
  const numLines = 60; // عدد الخطوط، يمكنك تعديله حسب الرغبة

  const lines = [];
  for (let i = 0; i < numLines; i++) {
    const randomHeight = Math.random() * 500 + 50; // ارتفاع عشوائي للخط بين 50 و 170 بكسل
    lines.push(
      <AnimatedLineSimple
        key={i}
        // تأخير عشوائي لبدء حركة كل خط (حتى 15 ثانية)
        delay={Math.random() * 15}
        // مدة عشوائية لحركة الخط (بين 7 و 15 ثانية)
        duration={7 + Math.random() * 8}
        // موقع أفقي عشوائي للخط
        left={`${Math.random() * 100}%`}
        height={`${randomHeight}px`}
        color={tealColor}
      />
    );
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // لون الخلفية الداكن، يمكنك استخدام ألوان من الثيم إذا أردت
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#121212",
        overflow: "hidden", // مهم لمنع ظهور الخطوط خارج حدود الخلفية
      }}
    >
      {lines}
    </Box>
  );
};

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const theme = useTheme(); // theme يُستخدم الآن في AnimatedLinesBackground

  // العبارات المتغيرة تبقى كما هي
  const phrases = [
    "ابدأ رحلتك الاستثمارية",
    "ادعم فكرة اليوم، مشروع الغد",
    "معًا نحو المستقبل",
    "رؤية تصنع الفرق",
    "تمويل يحقق الطموح",
    "معاً نحو المستقبل...بفكرة وتمويل",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // تغيير كل 3 ثوانٍ
    return () => clearInterval(interval);
  }, [phrases.length]); // أضفت phrases.length للاعتماديات

  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* الخلفية المتحركة الجديدة */}
      <AnimatedLinesBackground />

      {/* المحتوى فوق الخلفية */}
      <Container
        sx={{
          position: "relative",
          zIndex: 1, // للتأكد أن المحتوى فوق الخلفية
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: "rgba(79, 76, 76, 0.14)", // يمكنك تعديل شفافية هذا الصندوق حسب الحاجة
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center", // للتوسيط بشكل أفضل
          }}
        >
          <Typography variant="h2" sx={{ color: "white", textAlign: "center" }}>
            رؤية وتمويل
          </Typography>
          {/* العبارات المتغيرة */}
          <Fade in key={phraseIndex} timeout={1000}>
            <Typography
              variant="h6"
              sx={{
                color: "#DDDDDD", // لون أفتح قليلاً للتباين الأفضل
                minHeight: "30px", // للحفاظ على التخطيط أثناء تغير النص
                textAlign: "center",
                marginTop: theme.spacing(1), // إضافة هامش علوي بسيط
                marginBottom: theme.spacing(2), // إضافة هامش سفلي بسيط
              }}
            >
              {phrases[phraseIndex]}
            </Typography>
          </Fade>
          <Box display="flex" gap={2} justifyContent="center" mt={3}>
            <Link href="/login?role=investor" passHref>
              <Button variant="outlined" color="primary">
                {" "}
                {/* استخدام ألوان الثيم */}
                كمستثمر
              </Button>
            </Link>
            <Link href="/login?role=entrepreneur" passHref>
              <Button variant="outlined" color="error">
                {" "}
                {/* استخدام ألوان الثيم */}
                كرائد أعمال
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
