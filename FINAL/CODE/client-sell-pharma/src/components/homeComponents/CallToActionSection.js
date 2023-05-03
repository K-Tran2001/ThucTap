import React from "react";

const CallToActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn có cần nhiều lời khuyên hơn?</h2>
              <p>Đăng kí miễn phí và lấy những lời khuyên mới nhất.</p>
              <form className="form-section">
                <input placeholder="Email của bạn..." name="email" type="email" />
                <input value="Vâng,Tôi muốn!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
