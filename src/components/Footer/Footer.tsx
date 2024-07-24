// const Footer = () => {
//   return (
//     <footer className="footer px-4 py-6">
//       <div className="footer-content">
//         <p className="text-sm text-gray-600 text-center">
//           © Quantum Dev 2020. All rights reserved.{" "}
//           <a href="https://twitter.com/iaminos">by QuantumCode</a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
const Footer = () => {
  return (
    <footer className="footer px-6 py-6 bg-white shadow-inner">
      <div className="footer-content">
        <p className="text-sm text-gray-600 text-center">
          © Quantum Dev 2020. All rights reserved.{" "}
          <a
            href="https://twitter.com/iaminos"
            className="text-blue-600 hover:underline"
          >
            by QuantumCode
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
