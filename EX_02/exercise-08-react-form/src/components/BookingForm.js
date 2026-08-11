import { useState } from "react";

const initialForm = {
  fullName: "",
  address: "",
  from: "Hà Nội",
  to: "Đà Nẵng",
  outbound: false,
  returnTrip: false
};

function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState({
    type: "warning",
    text: "Vui lòng nhập đầy đủ thông tin trước khi đặt vé."
  });

  const isNameValid = form.fullName.trim().length >= 5;
  const isAddressValid = form.address.trim().length >= 5;
  const isRouteValid = form.from !== form.to;
  const isDirectionValid = form.outbound || form.returnTrip;

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (isNameValid && isAddressValid && isRouteValid && isDirectionValid) {
      setMessage({
        type: "success",
        text: `Đặt vé thành công cho ${form.fullName}!`
      });
    } else {
      setMessage({
        type: "danger",
        text: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại."
      });
    }
  }

  return (
    <>
      <div className={`alert alert-${message.type}`} role="alert">
        {message.text}
      </div>

      <h1 className="mb-4">Form đặt vé máy bay</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Họ tên
          </label>
          <div className="input-group">
            <span className="input-group-text">👤</span>
            <input
              id="fullName"
              name="fullName"
              className={`form-control ${
                submitted ? (isNameValid ? "is-valid" : "is-invalid") : ""
              }`}
              placeholder="Họ tên"
              value={form.fullName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              Họ tên phải có ít nhất 5 ký tự.
            </div>
          </div>
          <div className="form-text">Phải nhập 5 ký tự trở lên.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            className={`form-control ${
              submitted ? (isAddressValid ? "is-valid" : "is-invalid") : ""
            }`}
            value={form.address}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            Địa chỉ phải có ít nhất 5 ký tự.
          </div>
          <div className="form-text">Phải nhập 5 ký tự trở lên.</div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="from" className="form-label">
              Đi từ
            </label>
            <select
              id="from"
              name="from"
              className="form-select"
              value={form.from}
              onChange={handleChange}
            >
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
              <option>TP. Hồ Chí Minh</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="to" className="form-label">
              Đến
            </label>
            <select
              id="to"
              name="to"
              className={`form-select ${
                submitted ? (isRouteValid ? "is-valid" : "is-invalid") : ""
              }`}
              value={form.to}
              onChange={handleChange}
            >
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
              <option>TP. Hồ Chí Minh</option>
            </select>
            <div className="invalid-feedback">
              Điểm đến phải khác điểm đi.
            </div>
          </div>
        </div>

        <fieldset className="mb-3">
          <legend className="fs-6">Chọn chiều đi</legend>
          <div className="form-check">
            <input
              id="outbound"
              name="outbound"
              className="form-check-input"
              type="checkbox"
              checked={form.outbound}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="outbound">
              Đi
            </label>
          </div>
          <div className="form-check">
            <input
              id="returnTrip"
              name="returnTrip"
              className="form-check-input"
              type="checkbox"
              checked={form.returnTrip}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="returnTrip">
              Về
            </label>
          </div>
          {submitted && !isDirectionValid && (
            <div className="text-danger small mt-1">
              Vui lòng chọn ít nhất một chiều.
            </div>
          )}
        </fieldset>

        <button className="btn btn-primary w-100" type="submit">
          Đặt vé
        </button>
      </form>
    </>
  );
}

export default BookingForm;
