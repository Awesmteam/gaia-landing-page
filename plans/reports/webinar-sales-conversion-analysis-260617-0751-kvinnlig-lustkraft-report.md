# Phân tích Webinar → Cải thiện Sales Rate
**Webinar:** "Din kropp vet vägen" · Gaia Lindroos · Kvinnlig Lustkraft
**Offer:** 7.990 SEK (giảm 70% từ 26.850), 8 module + 12 live-webinar/năm + 2 bonus "Matka", deadline bonus 21:00 cùng tối, Klarna trả góp.
**Nguồn:** transcript 90 phút (15/06/2026). Không có số liệu attendance/conversion thật → khuyến nghị dựa trên cấu trúc.

---

## TL;DR — 7 đòn bẩy theo thứ tự tác động

| # | Đòn bẩy | Tác động | Effort |
|---|---------|----------|--------|
| 1 | **Thêm BẢO ĐẢM hoàn tiền** (14–30 ngày) — hiện KHÔNG có | 🔴 Rất cao | Thấp |
| 2 | **Chuỗi email bán SAU webinar** (replay + cart-close + last-chance) — hiện chỉ có nurture TRƯỚC | 🔴 Rất cao | TB |
| 3 | **Justify giá & khan hiếm thật** (vì sao 70%? tăng giá khi nào? giới hạn slot?) | 🟠 Cao | Thấp |
| 4 | **Neo giá theo ngày/tháng + ROI** ("≈666 SEK/tháng", rẻ hơn 1 buổi trị liệu) | 🟠 Cao | Thấp |
| 5 | **Tóm tắt OUTCOME rõ trước khi báo giá** (sau 8 tuần bạn sẽ…) | 🟠 Cao | Thấp |
| 6 | **Nhiều đợt CTA + tease offer sớm** (mở loop ~phút 20) thay vì dồn cuối | 🟡 TB | TB |
| 7 | **Objection handling có cấu trúc** (giá, "đã thử mọi thứ", bệnh lý cụ thể, tuổi) | 🟡 TB | Thấp |

---

## Cấu trúc hiện tại (time-map)

| Phút | Phần | Nhận xét |
|------|------|----------|
| 0–14 | Welcome + ai là Gaia (uy tín 27 năm, Storytel narrator) | Hơi dài; uy tín tốt |
| 14–22 | Câu chuyện cá nhân ("có tất cả nhưng trống rỗng") | Mạnh, đồng cảm cao |
| 22–58 | **Teaching/agitation**: nervsystem, beredskap, vagusnerv, 14 triệu chứng, undermedvetna | Rất mạnh nhưng **dài (~36 phút)** → rủi ro rớt người trước offer |
| 58–1:14 | Cơ chế trygghet + "bạn muốn gì" | Engagement tốt (micro-yes) |
| 1:14–1:27 | Testimonials + recap + "är du redo?" | Tốt |
| 1:27–1:38 | Lộ chương trình (8 module, 3 rörelser) | **Thiên về process, thiếu outcome** |
| 1:38–1:43 | Value stack → giá → bonus + deadline 21:00 | Có discount/urgency nhưng justify yếu |
| 1:43–1:50 | CTA, drop link, Q&A (4 câu) | **Offer mở rất muộn (~phút 83), cửa mua ngắn** |

**Điểm mạnh sẵn có:** agitation + đồng cảm xuất sắc; reframe "du är inte trasig / kroppen är intelligent"; social proof; micro-commitment liên tục (tummen opp); value stack + discount + deadline + Klarna + bonus + Q&A. Nền tảng tốt — vấn đề là **tối ưu phần OFFER/CLOSE và hậu webinar.**

---

## Phát hiện chi tiết & cách sửa

### 1. 🔴 KHÔNG có risk reversal (lỗ hổng lớn nhất)
Không hề nhắc bảo đảm hoàn tiền. Với sản phẩm cảm xúc 7.990 SEK, đây là rào cản #1.
**Sửa:** Thêm "trygghetsgaranti" 14–30 ngày hoàn tiền ("Prova module 1–2 utan risk"). Đặt ngay sau giá. Đây thường là đòn bẩy đơn lẻ nâng conversion mạnh nhất.

### 2. 🔴 Thiếu chuỗi bán SAU webinar
Bonus hết 21:00 CÙNG TỐI → người xem **replay** mất bonus, không có đường mua lại. Nurture ta đã build chỉ chạy TRƯỚC webinar (D-5→D-1).
**Sửa:** Build chuỗi đóng-giỏ sau webinar:
- E+0 (ngay sau): "Tack + replay + offer" (gia hạn bonus 24–48h cho người dự).
- E+1: Q&A/objections + testimonial.
- E+2: "Sista chansen" (đếm ngược cart-close).
- Replay-page có countdown thật.
→ Thường 30–50% doanh số đến từ hậu webinar. (Liên quan repo: thêm route `/erbjudande` + email templates trong `/emails`.)

### 3. 🟠 Justify giá & khan hiếm chưa thuyết phục
"70% rabatt, specialpris ikväll" nhưng **không nói vì sao** → nghe như discount tùy tiện (hạ perceived value), và nếu webinar nào cũng 70% thì urgency giả.
**Sửa:** Gắn lý do: "founding cohort / launch-pris", "giá lên X sau tối nay", hoặc "chỉ N slot vì live-webinar có giới hạn". Tách 2 lớp urgency: (a) bonus hết 21:00, (b) giá tăng sau.

### 4. 🟠 Neo giá yếu so với con số
Value 26.850 có mục "11.880 cho 12 webinar" nghe bơm số. 7.990 trình bày trần trụi.
**Sửa:**
- Quy ra ngày/tháng: "≈ 666 SEK/tháng" / "mindre än en kaffe om dagen".
- So sánh chi phí thay thế: 1 buổi trị liệu/tháng, năm tháng chịu đựng, glidmedel/läkarbesök vô ích.
- ROI quan hệ: chồng Maria "fått min fru tilbaka" → đóng khung giá trị cho **mối quan hệ/hôn nhân**, không chỉ bản thân.

### 5. 🟠 Bán process thay vì outcome
3 rörelser (reglering/skifte/integration) mô tả *quy trình*. Người mua mua *kết quả*.
**Sửa:** Trước giá, 1 slide "Efter 8 veckor:" → ngủ sâu hơn, lust trở lại, bớt irritation, bäckenbotten mềm, năng lượng… map mỗi outcome với 1 testimonial.

### 6. 🟡 Offer mở muộn + ít đợt CTA
~83 phút mới mở offer, link drop ~1 lần chính. Người rớt trước pitch = mất sạch.
**Sửa:**
- **Mở loop sớm (~phút 20):** "Cuối buổi mình sẽ chỉ cách đi tiếp + tặng 2 quà chỉ có tối nay" → giữ người.
- Drop link **nhiều đợt** (lúc reveal, sau testimonials, trong Q&A, lúc chốt) kèm "trong lúc bạn quyết định…".
- Rút gọn teaching ~5–8 phút để mở offer sớm hơn.

### 7. 🟡 Objection handling mỏng & chỉ ở cuối
Đã xử lý: sex-kurs? partner? thời gian? kinh nghiệm? **Thiếu:** giá/"quá đắt", "tôi đã thử mọi thứ", bệnh lý cụ thể (endometrios/klimakteriet) "liệu có hợp tôi", "quá già", "không có thời gian làm 8 module".
**Sửa:** Thêm 3–4 objection + reversal; rải vài cái *trước* khi báo giá (pre-empt), phần còn lại ở Q&A.

### 8. Social proof có thể mạnh hơn
Testimonials do Gaia đọc (screenshot), toàn cảm xúc ("fått ett liv").
**Sửa:** Thêm **video testimonial**, kết quả **cụ thể + mốc thời gian** ("sau 6 tuần…"), và 1–2 con số tổng ("X.000 phụ nữ").

### 9. Checkout friction
Form: namn + mail + **telefon** + betala. Telefon có thể tăng ma sát.
**Sửa:** Cân nhắc telefon optional; giữ Klarna nổi bật (đã tốt — hạ rào giá). Đảm bảo trang mua có lại: giá, bonus, **guarantee**, countdown, 1 CTA chính.

---

## Quick wins (làm ngay, effort thấp)
1. Thêm guarantee + nói thành lời trong webinar và trên trang mua.
2. Thêm lý do discount + dòng "giá tăng sau tối nay".
3. Neo giá theo tháng (Klarna) + so sánh chi phí thay thế.
4. Slide "Efter 8 veckor:" (outcome) trước giá.
5. Tease offer + bonus ở phút ~20.

## Thay đổi lớn hơn (impact cao)
1. Chuỗi email + trang bán hậu webinar (cart-close 48h).
2. Quay 2–3 video testimonial.
3. Rút gọn/tái cấu trúc teaching để mở offer sớm hơn ~5–10 phút.

## Chỉ số nên đo (để biết đòn nào ăn)
- Show-up rate (đăng ký → dự).
- **Retention tới phút mở offer (~83')** — nghi ngờ rớt nhiều ở đây.
- Live conversion vs **replay/email conversion**.
- CTR link trong webinar; add-to-cart → paid; tỷ lệ chọn Klarna.
- Refund rate (sau khi thêm guarantee).

---

## Unresolved questions
1. Có số liệu thật không (attendance, drop-off theo phút, conversion live vs replay)? Cần để ưu tiên chính xác.
2. Discount 70% là evergreen (mọi webinar) hay launch thật? → quyết định cách làm urgency.
3. Đã có guarantee ở trang mua mà chỉ thiếu trong lời nói? → cần xem trang checkout thật.
4. Có muốn mình build chuỗi email + trang `/erbjudande` hậu webinar trong repo không?
