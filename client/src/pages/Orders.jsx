import { useEffect, useState } from "react";
import api from "../services/api.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    limit: 10,
  });

  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [error, setError] = useState("");

  // Record New Order
  const [showOrderForm, setShowOrderForm] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    phone: "",
    source: "WhatsApp",
    productId: "",
    quantity: 1,
  });

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async (page = currentPage) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.append("page", page);
      params.append("limit", 10);

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (status) {
        params.append("status", status);
      }

      const response = await api.get(`/orders?${params.toString()}`);

      setOrders(response.data.orders || []);

      setPagination(
        response.data.pagination || {
          currentPage: page,
          totalPages: 1,
          totalOrders: 0,
          limit: 10,
        }
      );
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to fetch orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD + STATUS
  // =========================

  useEffect(() => {
    fetchOrders(currentPage);
  }, [status, currentPage]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    setCurrentPage(1);

    fetchOrders(1);
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrder(orderId);
      setError("");

      const response = await api.patch(
        `/orders/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );
    } catch (error) {
      console.error(
        "Error updating order status:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =========================
  // NEW ORDER INPUT
  // =========================

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;

    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CLOSE ORDER FORM
  // =========================

  const closeOrderForm = () => {
    setShowOrderForm(false);

    setNewOrder({
      customerName: "",
      phone: "",
      source: "WhatsApp",
      productId: "",
      quantity: 1,
    });
  };

  // =========================
  // STATUS COLORS
  // =========================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#D9C2A3]/40 text-[#6D4C41] border-[#D9C2A3]";

      case "Confirmed":
        return "bg-[#A8B29A]/30 text-[#3E2F2F] border-[#A8B29A]";

      case "Delivered":
        return "bg-[#A8B29A]/40 text-[#52604B] border-[#A8B29A]";

      case "Cancelled":
        return "bg-[#C58A8A]/20 text-[#8B5555] border-[#C58A8A]";

      default:
        return "bg-[#F8F5F0] text-[#6D4C41] border-[#D9C2A3]";
    }
  };

  // =========================
  // PAGE CHANGE
  // =========================

  const changePage = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] px-5 py-8 md:px-10 lg:px-14">

      {/* ================= HEADER ================= */}

      <div className="mb-9">
        <p className="mb-2 font-serif text-sm uppercase tracking-[0.2em] text-[#C58A8A]">
          HerRoom Business Management
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <h1 className="font-serif text-4xl font-semibold text-[#3E2F2F] md:text-5xl">
              Orders
            </h1>

            <p className="mt-2 font-serif text-lg text-[#6D4C41]">
              Record and manage orders from all your sales channels
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {/* TOTAL ORDERS */}

            <div className="rounded-2xl border border-[#D9C2A3]/60 bg-white/70 px-5 py-3 text-center shadow-sm">
              <p className="font-serif text-xs uppercase tracking-wider text-[#6D4C41]/60">
                Total Orders
              </p>

              <p className="font-serif text-2xl font-semibold text-[#3E2F2F]">
                {pagination.totalOrders}
              </p>
            </div>

            {/* RECORD ORDER BUTTON */}

            <button
              onClick={() => setShowOrderForm(true)}
              className="rounded-xl bg-[#6D4C41] px-6 py-3 font-serif font-medium text-white shadow-sm transition hover:bg-[#3E2F2F]"
            >
              + Record New Order
            </button>

          </div>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mb-6 rounded-xl border border-[#C58A8A]/50 bg-[#C58A8A]/10 px-4 py-3 text-sm text-[#8B5555]">
          {error}
        </div>
      )}

      {/* ================= SEARCH + FILTER ================= */}

      <div className="mb-8 rounded-2xl border border-[#D9C2A3]/60 bg-white/70 p-4 shadow-sm backdrop-blur-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          <form
            onSubmit={handleSearch}
            className="flex flex-1"
          >
            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C58A8A]">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search customer by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#D9C2A3]/70 bg-[#F8F5F0] py-3 pl-11 pr-4 font-serif text-[#3E2F2F] outline-none transition placeholder:text-[#6D4C41]/50 focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
              />

            </div>

            <button
              type="submit"
              className="ml-2 rounded-xl bg-[#6D4C41] px-6 font-serif text-white transition hover:bg-[#3E2F2F]"
            >
              Search
            </button>
          </form>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#D9C2A3]/70 bg-[#F8F5F0] px-5 py-3 font-serif text-[#6D4C41] outline-none focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
          >
            <option value="">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {/* ================= ORDERS ================= */}

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D9C2A3] border-t-[#C58A8A]" />

          <p className="font-serif text-lg text-[#6D4C41]">
            Loading your orders...
          </p>

        </div>

      ) : orders.length === 0 ? (

        <div className="rounded-3xl border border-[#D9C2A3]/60 bg-white/70 px-6 py-20 text-center shadow-sm">

          <div className="mb-4 text-5xl">
            🛍️
          </div>

          <h2 className="font-serif text-2xl font-semibold text-[#3E2F2F]">
            No orders found
          </h2>

          <p className="mt-2 font-serif text-[#6D4C41]/70">
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="group rounded-3xl border border-[#D9C2A3]/50 bg-white p-6 shadow-[0_4px_20px_rgba(109,76,65,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(109,76,65,0.12)] md:p-7"
            >

              {/* TOP */}

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C58A8A]/15 font-serif text-xl text-[#6D4C41]">
                    {order.customer.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h2 className="font-serif text-xl font-semibold text-[#3E2F2F]">
                      {order.customer.name}
                    </h2>

                    <p className="font-serif text-sm text-[#6D4C41]/70">
                      {order.customer.phone}
                    </p>

                  </div>

                </div>

                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">

                  <span className="rounded-full bg-[#F8F5F0] px-3 py-1 font-serif text-xs text-[#6D4C41]/70">
                    {order.source || "Other"}
                  </span>

                  <select
                    value={order.status}
                    disabled={updatingOrder === order._id}
                    onChange={(e) =>
                      updateOrderStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className={`cursor-pointer rounded-full border px-4 py-2 font-serif text-sm font-medium outline-none transition disabled:cursor-wait disabled:opacity-60 ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </div>

              <div className="my-6 border-t border-[#D9C2A3]/40" />

              {/* ITEMS */}

              <div className="space-y-4">

                {order.items.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-2xl bg-[#F8F5F0] px-4 py-4"
                  >

                    <div>

                      <p className="font-serif text-lg font-medium text-[#3E2F2F]">
                        {item.productId?.name ||
                          "Product"}
                      </p>

                      <p className="mt-1 font-serif text-sm text-[#6D4C41]/60">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <p className="font-serif text-lg font-semibold text-[#6D4C41]">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>

              {/* BOTTOM */}

              <div className="mt-6 flex flex-col justify-between gap-4 border-t border-[#D9C2A3]/40 pt-5 sm:flex-row sm:items-end">

                <div>

                  <p className="font-serif text-xs uppercase tracking-wider text-[#6D4C41]/50">
                    Order ID
                  </p>

                  <p className="mt-1 max-w-[250px] truncate font-mono text-xs text-[#6D4C41]/70">
                    {order._id}
                  </p>

                </div>

                <div className="sm:text-right">

                  <p className="font-serif text-sm text-[#6D4C41]/60">
                    Total Amount
                  </p>

                  <p className="font-serif text-2xl font-semibold text-[#3E2F2F]">
                    ₹{order.totalAmount}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================= PAGINATION ================= */}

      {!loading &&
        orders.length > 0 &&
        pagination.totalPages > 1 && (

          <div className="mt-8 flex items-center justify-center gap-2">

            <button
              onClick={() =>
                changePage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className="rounded-xl border border-[#D9C2A3] bg-white px-4 py-2 font-serif text-[#6D4C41] transition hover:bg-[#D9C2A3]/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>

            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                onClick={() => changePage(page)}
                className={`h-10 w-10 rounded-xl border font-serif transition ${
                  currentPage === page
                    ? "border-[#6D4C41] bg-[#6D4C41] text-white"
                    : "border-[#D9C2A3] bg-white text-[#6D4C41] hover:bg-[#D9C2A3]/20"
                }`}
              >
                {page}
              </button>

            ))}

            <button
              onClick={() =>
                changePage(currentPage + 1)
              }
              disabled={
                currentPage === pagination.totalPages
              }
              className="rounded-xl border border-[#D9C2A3] bg-white px-4 py-2 font-serif text-[#6D4C41] transition hover:bg-[#D9C2A3]/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>

          </div>

        )}

      {/* ================= RECORD ORDER MODAL ================= */}

      {showOrderForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3E2F2F]/40 px-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#D9C2A3]/60 bg-[#F8F5F0] p-6 shadow-2xl md:p-8">

            {/* MODAL HEADER */}

            <div className="mb-7 flex items-start justify-between">

              <div>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#C58A8A]">
                  HerRoom Orders
                </p>

                <h2 className="mt-1 font-serif text-3xl font-semibold text-[#3E2F2F]">
                  Record New Order
                </h2>

                <p className="mt-2 font-serif text-sm text-[#6D4C41]/70">
                  Add an order received through WhatsApp, Instagram, phone or in person.
                </p>
              </div>

              <button
                onClick={closeOrderForm}
                className="text-2xl text-[#6D4C41]/60 transition hover:text-[#3E2F2F]"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5">

              {/* CUSTOMER NAME */}

              <div>
                <label className="mb-2 block font-serif text-sm font-medium text-[#6D4C41]">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleNewOrderChange}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-[#D9C2A3]/70 bg-white px-4 py-3 font-serif text-[#3E2F2F] outline-none placeholder:text-[#6D4C41]/40 focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
                />
              </div>

              {/* PHONE */}

              <div>
                <label className="mb-2 block font-serif text-sm font-medium text-[#6D4C41]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={newOrder.phone}
                  onChange={handleNewOrderChange}
                  placeholder="e.g. 9876543210"
                  className="w-full rounded-xl border border-[#D9C2A3]/70 bg-white px-4 py-3 font-serif text-[#3E2F2F] outline-none placeholder:text-[#6D4C41]/40 focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
                />
              </div>

              {/* SOURCE */}

              <div>
                <label className="mb-2 block font-serif text-sm font-medium text-[#6D4C41]">
                  Order Source
                </label>

                <select
                  name="source"
                  value={newOrder.source}
                  onChange={handleNewOrderChange}
                  className="w-full rounded-xl border border-[#D9C2A3]/70 bg-white px-4 py-3 font-serif text-[#3E2F2F] outline-none focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
                >
                  <option value="WhatsApp">
                    WhatsApp
                  </option>

                  <option value="Instagram">
                    Instagram
                  </option>

                  <option value="In Person">
                    In Person
                  </option>

                  <option value="Phone">
                    Phone
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* PRODUCT ID TEMPORARILY */}

              <div>
                <label className="mb-2 block font-serif text-sm font-medium text-[#6D4C41]">
                  Product ID
                </label>

                <input
                  type="text"
                  name="productId"
                  value={newOrder.productId}
                  onChange={handleNewOrderChange}
                  placeholder="Paste product ID"
                  className="w-full rounded-xl border border-[#D9C2A3]/70 bg-white px-4 py-3 font-mono text-sm text-[#3E2F2F] outline-none placeholder:text-[#6D4C41]/40 focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
                />

                <p className="mt-2 font-serif text-xs text-[#6D4C41]/60">
                  We will replace this with your product dropdown after connecting your existing Product API.
                </p>
              </div>

              {/* QUANTITY */}

              <div>
                <label className="mb-2 block font-serif text-sm font-medium text-[#6D4C41]">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={newOrder.quantity}
                  onChange={handleNewOrderChange}
                  className="w-full rounded-xl border border-[#D9C2A3]/70 bg-white px-4 py-3 font-serif text-[#3E2F2F] outline-none focus:border-[#C58A8A] focus:ring-2 focus:ring-[#C58A8A]/20"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={closeOrderForm}
                  className="flex-1 rounded-xl border border-[#D9C2A3] bg-white px-5 py-3 font-serif text-[#6D4C41] transition hover:bg-[#D9C2A3]/20"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-xl bg-[#6D4C41] px-5 py-3 font-serif font-medium text-white transition hover:bg-[#3E2F2F]"
                >
                  Record Order
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
