const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Lấy thẻ form xóa
const deleteForm = document.getElementById('deleteForm');

// Thêm sự kiện submit vào form
deleteForm.addEventListener('submit', function(event) {
    // Ngăn chặn hành vi mặc định của form
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('You need to login to delete news');
        window.location.href = '/login.xhtml';
        return;
    }
    event.preventDefault();
    // Hiển thị hộp thoại xác nhận
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        // Thay đổi action của form để chuyển hướng đến URL xóa
        deleteForm.action = `http://localhost:4090/news/delete/${id}`;
        // Submit form
        deleteForm.submit();
        form.reset();

        alert("News created successfully");

        window.location.href = "/index.xhtml";
    }
});