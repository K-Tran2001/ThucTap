
import styles from "./footer.module.css";

import React, { useEffect, useRef, useState } from "react";
import {useDispatch,useSelector} from "react-redux";

export default function Footer2() {


  const dispatch=useDispatch()
  const contentSingle=useSelector((state) => state.contentSingle)
  const {contentUp}=contentSingle

  return (
    <footer className={styles.footer}>
      <div className={styles.tz_footer_content}>
        <div className="container">
          <div className="row">
            <div
              className={`col-lg-6 col-md-8 col-sm-8 col-xs-12 ${styles.footer_item}`}
            >
              <p className={styles.footer_p}>
                Copyright © {(new Date()).getFullYear()} Project Demo. All rights
                reserved.
              </p>
              <h3 className={styles.module_title}>
                {/* <img src="/footer_logo.png" alt="logo-footer" /> */}
                <span className={styles.footer_span}>
                  Project Demo Offical
                </span>
              </h3>
              <div className={styles.tzwidget_contact}>
                <address className={styles.widget_address}>
                  <strong>Địa chỉ công ty: </strong>
                  {contentUp?.companyAddress}
                </address>
                <span className={styles.footer_span}>
                  {/* <strong>HOTLINE: 1900 9204 | Điện thoại: </strong>
                  <span className={styles.footer_p}>
                    (024)-3.622.77.99 -
                  </span>{" "} */}
                  <strong>Điện thoại: </strong>
                  <span className={styles.footer_p}>{contentUp?.phone}</span>
                  <br />
                </span>
                <a
                  className={styles.footer_a}
                  href="mailto:<strong>Email: </strong>khoatran135.246@gmail.com"
                  target="_top"
                >
                  <strong>Email: </strong>projectdemo@gmail.com
                  {/* <br />
                  <strong>Website: </strong>www.pkdkmythanh.com{" "} */}
                </a>
                <br />
                <a
                  className={styles.footer_a}
                  href="www.pkdkmythanh.com"
                  target="_top"
                >
                  {/* <strong>Email: </strong>info@pkdkmythanh.com | support@pkdkmythanh.com
                  <br /> */}
                  <strong>Website: </strong>projectdemo
                </a>
                <br />
                <a
                  className={styles.footer_a}
                  href={contentUp?.fbUrl}
                  target="_top"
                >
                  {/* <strong>Email: </strong>info@pkdkmythanh.com | support@pkdkmythanh.com
                  <br /> */}
                  <strong>Fanpage: </strong>{contentUp?.fbUrl}
                </a>
                <div style={{
                  marginBottom: '5px'
                }}>
                  <img src={contentUp?.qrCode} height={110} alt='qrcode_fanpage_m.jpeg' />
                </div>
                <p className={styles.footer_p}>
                  Giờ làm việc: Từ Thứ Hai đến Thứ Bảy hàng tuần <br />
                  Sáng: 7h30 đến 12h00 - Chiều: 13h30 - 17h00
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-12 col-xs-12">
              <div className="row">
                <div
                  className={`col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles.footer_item}`}
                >
                  <br />
                  <a
                    className={styles.footer_a}
                    href="/chinh-sach-va-quy-dinh-chung"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    * Chính sách &amp; quy định chung
                  </a>
                  <br />
                  <a
                    className={styles.footer_a}
                    href="/hinh-thuc-thanh-toan"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    * Quy định &amp; hình thức thanh toán
                  </a>
                  <br />
                  <a
                    className={styles.footer_a}
                    href="/chinh-sach-bao-mat-thong-tin-ca-nhan"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    * Chính sách bảo mật thông tin cá nhân
                  </a>
                  <br />
                  <br />
                  <a href="#" target="_blank">
                    <img
                      src="http://localhost:5000/upload/bo_cong_thuong.png"
                      alt="da-thong-bao-bo-cong-thuong"
                      style={{
                        width: "200px",
                        height: "auto",
                      }}
                    />
                  </a>
                </div>
                <div
                  className={`col-lg-6 col-md-12 col-sm-12 col-xs-12 ${styles.footer_item}`}
                >
                  <div className={styles.text_widget}>
                    <iframe
                      className={styles.iframe}
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62783.61161437417!2d105.3589504!3d10.4235008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1664112014503!5m2!1svi!2s"
                      width="600"
                      height="270"
                      style={{ border: 0 }}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <br />
            <a
              style={{ color: "#fff", textAlign: "center", width: "100%" }}
              
            >
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "Baomoi",
                  textAlign: "center",
                }}
              >
                *Các thông tin y tế trên projectdemo.com chỉ mang tính chất tham
                khảo, khi áp dụng phải tuyệt đối tuân theo chỉ dẫn của Bác sĩ.
                Chúng tôi tuyệt đối không chịu bất cứ trách nhiệm nào do việc tự
                ý áp dụng các thông tin trên projectdemo.com gây ra.
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.form_f}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
              <div className={styles.search}>
                <form action="/search" method="get">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    name="query"
                    
                    id="tz-search-input"
                    className={styles.tz_search_input}
                  />
                  
                  <i className={`fa fa-search ${styles.search_i}`}></i>
                </form>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-8">
              <div className={styles.list_f}>
                <a href="/" className={styles.list_f_a}>
                  Trang chủ
                </a>
                <a
                  href="http://yhocvasuckhoe.net/"
                  target="_blank"
                  className={styles.list_f_a}
                >
                  Giới thiệu
                </a>
                <a href="/dichvu" title="Dịch vụ" className={styles.list_f_a}>
                  Dịch vụ
                </a>
                <a className={styles.list_f_a} href="/tintuc" title="Tin tức">
                  Tin tức
                </a>
                <a
                  className={styles.list_f_a}
                  href="/tuyendung"
                  title="Tuyển dụng"
                >
                  Tuyển dụng
                </a>
                <a className={styles.list_f_a} href="/banggia" title="Bảng giá">
                  Bảng giá
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}
