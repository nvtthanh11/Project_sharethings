/* =========================================================
   ShareThings — site.js
   1) Light / Dark theme toggle (lưu lựa chọn trong localStorage)
   2) Chat widget trả lời theo KỊCH BẢN CÓ SẴN, chạy 100% trong trình duyệt.
      KHÔNG gọi API AI, KHÔNG dùng bất kỳ API key nào => 0đ chi phí,
      không lộ key, không lộ cấu trúc hệ thống.
   Chọn bộ kịch bản qua <body data-product="replyflow|vidflow|hub">
   ========================================================= */
(function () {
  'use strict';

  var CONTACT = {
    phone: '0908674036',
    zalo: 'https://zalo.me/0908674036',
    telegram: 'https://t.me/nvtthanh11',
    telegramName: '@nvtthanh11',
    email: 'nvtthanh11@gmail.com'
  };

  /* ---------------- Theme ---------------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('st-theme', t); } catch (e) {}
    var btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  }
  window.toggleTheme = function () {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  };

  /* ---------------- Chat knowledge base ---------------- */
  var CONTACT_LINE = 'Anh/chị cần hỗ trợ trực tiếp có thể gọi/Zalo ' + CONTACT.phone + ' hoặc nhắn Telegram ' + CONTACT.telegramName + ' ạ.';

  var KB = {
    replyflow: {
      title: 'Trợ lý ReplyFlow',
      welcome: 'Xin chào anh/chị 👋 Em là trợ lý tự động của ReplyFlow. Anh/chị muốn tìm hiểu điều gì ạ?',
      quick: [
        ['Bảng giá các gói', 'gia goi'],
        ['Dùng thử 2.000đ', 'dung thu'],
        ['Cách lấy Page ID', 'page id'],
        ['Có an toàn cho Fanpage?', 'an toan'],
        ['Gặp tư vấn viên', 'lien he']
      ],
      intents: [
        { k: ['goi dien', 'nguoi that', 'tu van vien', 'gap nhan vien'], a: CONTACT_LINE, action: 'contact' },
        { k: ['giao hang', 'ship'], a: 'Dạ ReplyFlow tư vấn phí và thời gian giao hàng theo đúng chính sách anh/chị cài đặt cho shop, đồng thời tự hỏi địa chỉ, số điện thoại khi khách muốn đặt ạ.' },
        { k: ['xin chao', 'hello', 'chao ', 'alo', 'hi '], a: 'Dạ em chào anh/chị ạ! ReplyFlow giúp Fanpage tự trả lời khách 24/7, tự ẩn số điện thoại trong bình luận và tự xác nhận chuyển khoản. Anh/chị đang bán ngành hàng gì để em tư vấn kỹ hơn ạ?' },
        { k: ['ruby', 'diamond', 'kim cuong', 'ban dut', 'tron doi', 'vinh vien', 'goi cao'], a: 'Dạ hiện tại cả 3 gói VIP, RUBY và DIAMOND (bản quyền trọn đời) đều đã mở đăng ký chính thức.\n• Gói RUBY: có thêm tính năng học lịch sử chat cũ, cá nhân hóa cách tư vấn theo từng khách và xuất hồ sơ Excel.\n• Gói DIAMOND: bản quyền trọn đời cho 1 Fanpage, đồng bộ website và kỹ thuật viên hỗ trợ 1-1.\nAnh/chị nhắn Telegram ' + CONTACT.telegramName + ' hoặc Zalo ' + CONTACT.phone + ' để được kích hoạt ngay nhé.' },
        { k: ['gia han', '10k', '10.000', '10000', 'het han'], a: 'Dạ sau tháng dùng thử, phí duy trì gói VIP là 10.000đ/tháng.\nAnh/chị chọn "Gia hạn 1 tháng — 10.000đ" ở mục Kích hoạt, nhập Page ID rồi quét QR. Thời gian sẽ được cộng dồn vào hạn đang còn, không bị mất ngày ạ.' },
        { k: ['dung thu', '2k', '2.000', '2000', 'trial', 'thu nghiem'], a: 'Dạ gói VIP có tháng đầu dùng thử chỉ 2.000đ (mức chuyển tối thiểu để hệ thống ghi nhận).\n• Dùng đầy đủ tính năng gói VIP trong 30 ngày\n• Mỗi Fanpage được dùng thử 1 lần\n• Sau đó 10.000đ/tháng, không tự trừ tiền — anh/chị chủ động gia hạn khi muốn dùng tiếp.' },
        { k: ['gia', 'bao nhieu', 'phi', 'chi phi', 'bang gia', 'goi', 'tien'], a: 'Dạ ReplyFlow hiện mở bán đầy đủ cả 3 gói:\n• VIP: tháng đầu 2.000đ, sau đó 10.000đ/tháng\n• RUBY: gói tăng trưởng (học lịch sử chat cũ & cá nhân hóa theo từng khách)\n• DIAMOND: gói toàn diện (bản quyền trọn đời 1 Fanpage)\nAnh/chị kéo xuống mục "Bảng giá" để xem chi tiết quyền lợi từng gói ạ.' },
        { k: ['page id', 'id trang', 'lay id', 'fanpage id', 'id page', 'id cua trang'], a: 'Cách lấy Page ID:\n1. Mở Fanpage trên Facebook\n2. Bấm "Giới thiệu" → "Tính minh bạch của Trang"\n3. Sao chép dãy số "ID Trang"\nSau đó dán vào ô Page ID ở mục Kích hoạt là hệ thống tự tạo mã QR đúng nội dung ạ.' },
        { k: ['chua kich hoat', 'chua thay', 'khong kich hoat', 'loi', 'khong duoc', 'chuyen roi'], a: 'Dạ anh/chị vui lòng kiểm tra lại nội dung chuyển khoản đã ghi đúng dãy số Page ID của Fanpage (ví dụ: 100234567890123) chưa ạ.\nNếu đã đúng mà sau 5 phút vẫn chưa kích hoạt, anh/chị gửi ảnh giao dịch qua Zalo ' + CONTACT.phone + ' hoặc Telegram ' + CONTACT.telegramName + ', bên em xử lý ngay ạ.' },
        { k: ['kich hoat', 'bao lau', 'chuyen khoan', 'thanh toan', 'qr', 'nap'], a: 'Dạ quy trình rất đơn giản:\n1. Nhập Page ID\n2. Chọn gói\n3. Quét mã QR bằng app ngân hàng (đã điền sẵn số tiền và nội dung)\nHệ thống tự kích hoạt trong vài giây sau khi nhận tiền ạ.' },
        { k: ['khoa page', 'an toan', 'bi khoa', 'vi pham', 'chinh sach facebook', 'checkpoint'], a: 'Dạ ReplyFlow kết nối qua kênh chính thức do Facebook cung cấp cho doanh nghiệp, không cần mật khẩu Facebook của anh/chị, và tuân thủ quy định nhắn tin của Facebook. Anh/chị có thể gỡ kết nối bất cứ lúc nào trong phần cài đặt Facebook ạ.' },
        { k: ['can gi', 'chuan bi', 'yeu cau', 'cai dat', 'setup', 'huong dan', 'bat dau'], a: 'Dạ anh/chị chỉ cần:\n• Quyền quản trị Fanpage\n• Thông tin sản phẩm, bảng giá, chính sách giao hàng của shop\nBên em hỗ trợ kết nối 1-1 qua Zalo/Telegram, thường mất khoảng 15–30 phút ạ.' },
        { k: ['ban dem', '24/7', 'nghi', 'luc nao', 'ngay le'], a: 'Dạ ReplyFlow hoạt động 24/7, kể cả ban đêm và ngày lễ. Khi nhân viên của shop vào trả lời thì hệ thống tự nhường lại để không bị trùng tin nhắn ạ.' },
        { k: ['so dien thoai', 'binh luan', 'cuop khach', 'an sdt', 'comment'], a: 'Dạ khi khách để lại số điện thoại dưới bài viết, ReplyFlow tự ẩn bình luận gần như ngay lập tức và nhắn tin riêng cho khách, giúp đối thủ không thể lấy được thông tin khách của shop ạ.' },
        { k: ['bill', 'xac nhan', 'anh chuyen khoan', 'doi soat'], a: 'Dạ khi khách gửi ảnh chuyển khoản, ReplyFlow tự kiểm tra số tiền có khớp đơn hay không, cảnh báo nếu có dấu hiệu bất thường và gửi tin xác nhận cho khách ạ.' },
        { k: ['nganh', 'my pham', 'thoi trang', 'spa', 'phu hop', 'ban gi', 'linh vuc'], a: 'Dạ ReplyFlow phù hợp hầu hết shop bán hàng qua Fanpage: thời trang, mỹ phẩm, phụ kiện, đồ gia dụng, spa, dịch vụ... Anh/chị cho em biết ngành hàng để em gợi ý cách thiết lập phù hợp nhé.' },
        { k: ['nhieu page', 'nhieu fanpage', '2 page', 'hai page', 'agency'], a: 'Dạ mỗi gói áp dụng cho 1 Fanpage. Nếu anh/chị cần dùng cho nhiều Fanpage hoặc làm agency, vui lòng liên hệ Telegram ' + CONTACT.telegramName + ' để được báo giá riêng ạ.' },
        { k: ['hoan tien', 'tra lai tien', 'refund'], a: 'Dạ chi tiết chính sách hoàn tiền anh/chị xem tại trang "Điều khoản dịch vụ" ở cuối trang. Nếu có vấn đề kỹ thuật, bên em luôn ưu tiên hỗ trợ khắc phục trước ạ.' },
        { k: ['du lieu', 'bao mat', 'xoa du lieu', 'rieng tu', 'privacy'], a: 'Dạ ReplyFlow không bán hay chia sẻ dữ liệu khách hàng của shop cho bên thứ ba. Anh/chị xem chi tiết tại "Chính sách bảo mật" và có thể yêu cầu xóa dữ liệu bất cứ lúc nào ở trang "Xóa dữ liệu" ạ.' },
        { k: ['video', 'vidflow'], a: 'Dạ nếu anh/chị cần tự động làm và đăng video, bên em có sản phẩm VidFlow. Anh/chị xem tại trang vidflow.html nhé.' },
        { k: ['lien he', 'nguoi that', 'nhan vien', 'tu van vien', 'goi dien', 'zalo', 'telegram', 'hotline'], a: CONTACT_LINE, action: 'contact' }
      ]
    },

    vidflow: {
      title: 'Trợ lý VidFlow',
      welcome: 'Xin chào anh/chị 👋 Em là trợ lý tự động của VidFlow. Anh/chị cần tìm hiểu gì ạ?',
      quick: [
        ['VidFlow làm được gì?', 'lam duoc gi'],
        ['Nền tảng hỗ trợ', 'nen tang'],
        ['Chi phí', 'chi phi'],
        ['Đặt lịch demo', 'demo']
      ],
      intents: [
        { k: ['xin chao', 'hello', 'chao ', 'alo', 'hi '], a: 'Dạ em chào anh/chị! VidFlow giúp tự động làm và đăng video cho nhiều kênh cùng lúc. Anh/chị đang quản lý khoảng bao nhiêu kênh ạ?' },
        { k: ['lam duoc gi', 'la gi', 'tinh nang', 'chuc nang'], a: 'Dạ VidFlow tự tìm chủ đề đang được quan tâm, viết kịch bản, dựng video ngắn và dài, rồi đăng đúng lịch lên các kênh của anh/chị. Đội ngũ chỉ cần duyệt và theo dõi kết quả ạ.' },
        { k: ['nen tang', 'facebook', 'youtube', 'tiktok', 'dang len'], a: 'Dạ VidFlow hỗ trợ đăng lên Facebook, YouTube và TikTok qua kênh chính thức của từng nền tảng ạ.' },
        { k: ['dai', 'thoi luong', 'phut', 'ngan'], a: 'Dạ VidFlow làm được cả video ngắn và video dài khoảng 10–15 phút ạ.' },
        { k: ['gia', 'chi phi', 'bao nhieu', 'phi'], a: 'Dạ chi phí VidFlow phụ thuộc số kênh và số video mỗi ngày. Anh/chị nhắn Telegram ' + CONTACT.telegramName + ' hoặc Zalo ' + CONTACT.phone + ' để nhận báo giá phù hợp ạ.' },
        { k: ['demo', 'xem thu', 'dung thu', 'lich'], a: 'Dạ bên em demo trực tiếp trên kênh mẫu, không cần cam kết trước. Anh/chị nhắn Telegram ' + CONTACT.telegramName + ' hoặc Zalo ' + CONTACT.phone + ' để đặt lịch ạ.', action: 'contact' },
        { k: ['ban quyen', 'copyright', 'vi pham'], a: 'Dạ video thành phẩm thuộc quyền sở hữu của anh/chị. VidFlow ưu tiên tư liệu hợp lệ và có bước kiểm tra chất lượng trước khi đăng ạ. Chi tiết xem tại "Điều khoản VidFlow".' },
        { k: ['ban hang', 'fanpage', 'replyflow', 'tra loi tin nhan'], a: 'Dạ nếu anh/chị cần trợ lý tự trả lời tin nhắn Fanpage, bên em có ReplyFlow — đang có gói dùng thử 2.000đ ở trang replyflow.html ạ.' },
        { k: ['lien he', 'nguoi that', 'tu van', 'zalo', 'telegram', 'hotline'], a: CONTACT_LINE, action: 'contact' }
      ]
    },

    hub: {
      title: 'Trợ lý ShareThings',
      welcome: 'Xin chào anh/chị 👋 ShareThings hiện có ReplyFlow (trợ lý bán hàng Fanpage) và VidFlow (tự động làm video). Anh/chị quan tâm sản phẩm nào ạ?',
      quick: [
        ['ReplyFlow', 'replyflow'],
        ['VidFlow', 'vidflow'],
        ['Liên hệ', 'lien he']
      ],
      intents: [
        { k: ['replyflow', 'fanpage', 'tin nhan', 'ban hang', 'chot don'], a: 'Dạ ReplyFlow giúp Fanpage tự trả lời khách 24/7, ẩn số điện thoại trong bình luận và xác nhận chuyển khoản. Đang có gói dùng thử 2.000đ — anh/chị xem tại trang ReplyFlow ạ.', action: 'go:replyflow.html' },
        { k: ['vidflow', 'video', 'youtube', 'tiktok'], a: 'Dạ VidFlow tự làm và đăng video cho nhiều kênh Facebook, YouTube, TikTok. Anh/chị xem chi tiết tại trang VidFlow ạ.', action: 'go:vidflow.html' },
        { k: ['babyguard', 'em be', 'camera'], a: 'Dạ BabyGuard đang trong giai đoạn thử nghiệm nội bộ, bên em sẽ thông báo khi ra mắt ạ.' },
        { k: ['gia', 'bao nhieu', 'chi phi'], a: 'Dạ ReplyFlow có gói VIP chỉ 2.000đ tháng đầu, sau đó 10.000đ/tháng. VidFlow báo giá theo số kênh. Anh/chị quan tâm sản phẩm nào ạ?' },
        { k: ['lien he', 'zalo', 'telegram', 'hotline', 'tu van'], a: CONTACT_LINE, action: 'contact' }
      ]
    }
  };

  function normalize(s) {
    return (' ' + s + ' ').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/\s+/g, ' ');
  }

  function findAnswer(kb, text) {
    var n = normalize(text);
    for (var i = 0; i < kb.intents.length; i++) {
      var it = kb.intents[i];
      for (var j = 0; j < it.k.length; j++) {
        if (n.indexOf(it.k[j]) !== -1) return it;
      }
    }
    return { a: 'Dạ câu này em chưa trả lời chính xác được. ' + CONTACT_LINE, action: 'contact' };
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function buildChat(product) {
    var kb = KB[product] || KB.hub;

    var trigger = el('button', 'chatbot-trigger');
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Mở hộp chat hỗ trợ');
    trigger.innerHTML = '<span class="online-dot"></span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

    var win = el('div', 'chat-window');
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', kb.title);
    win.innerHTML =
      '<div class="chat-header"><div class="chat-header-info"><div class="chat-avatar">💬</div><div><strong></strong><span>● Đang trực tuyến</span></div></div>' +
      '<button type="button" class="chat-close-btn" aria-label="Đóng">✕</button></div>' +
      '<div class="chat-body"></div>' +
      '<form class="chat-footer"><input class="chat-input" type="text" placeholder="Nhập câu hỏi..." aria-label="Nhập câu hỏi" maxlength="300"><button class="chat-send-btn" type="submit">Gửi</button></form>' +
      '<div class="chat-disclaimer">Trả lời tự động theo kịch bản. Cần gấp: Zalo ' + CONTACT.phone + '</div>';
    win.querySelector('.chat-header-info strong').textContent = kb.title;

    var body = win.querySelector('.chat-body');
    var form = win.querySelector('.chat-footer');
    var input = win.querySelector('.chat-input');

    function scroll() { body.scrollTop = body.scrollHeight; }
    function bot(text) { body.appendChild(el('div', 'chat-msg bot', text)); scroll(); }
    function user(text) { body.appendChild(el('div', 'chat-msg user', text)); scroll(); }

    function contactButtons() {
      var wrap = el('div', 'chat-quick-actions');
      [['📞 Zalo ' + CONTACT.phone, CONTACT.zalo], ['✈️ Telegram ' + CONTACT.telegramName, CONTACT.telegram]].forEach(function (b) {
        var a = el('a', 'chat-pill-btn', b[0]);
        a.href = b[1]; a.target = '_blank'; a.rel = 'noopener';
        wrap.appendChild(a);
      });
      body.appendChild(wrap); scroll();
    }

    function quickButtons() {
      var wrap = el('div', 'chat-quick-actions');
      kb.quick.forEach(function (q) {
        var b = el('button', 'chat-pill-btn', q[0]);
        b.type = 'button';
        b.addEventListener('click', function () { ask(q[0], q[1]); });
        wrap.appendChild(b);
      });
      body.appendChild(wrap); scroll();
    }

    function ask(display, query) {
      user(display);
      var res = findAnswer(kb, query || display);
      setTimeout(function () {
        bot(res.a);
        if (res.action === 'contact') contactButtons();
        if (res.action && res.action.indexOf('go:') === 0) {
          var wrap = el('div', 'chat-quick-actions');
          var a = el('a', 'chat-pill-btn', 'Mở trang →');
          a.href = res.action.slice(3);
          wrap.appendChild(a); body.appendChild(wrap); scroll();
        }
      }, 350);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      input.value = '';
      ask(v);
    });

    var started = false;
    function toggle() {
      win.classList.toggle('open');
      if (win.classList.contains('open')) {
        if (!started) { started = true; bot(kb.welcome); quickButtons(); }
        input.focus();
      }
    }
    trigger.addEventListener('click', toggle);
    win.querySelector('.chat-close-btn').addEventListener('click', toggle);

    document.body.appendChild(win);
    document.body.appendChild(trigger);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', window.toggleTheme);
    var product = document.body.getAttribute('data-product');
    if (product) buildChat(product);
  });
})();
