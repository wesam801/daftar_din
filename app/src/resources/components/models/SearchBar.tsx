"use client";

import { useState } from "react";

export default function SearchBar() {
  const initialData = [{ name: "", number: 0 }];
  const [data, setData] = useState(initialData);
  const [results, setResults] = useState([...data]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newDebt, setNewDebt] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [show2Form, setShow2Form] = useState(false);
  const [statistics, setStatistics] = useState([]); // حالة الإحصائيات

  // الحصول على التاريخ الافتراضي
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // صيغة YYYY-MM-DD
  };

  const handleInput = (ev: Event) => {
    const query = (ev.target as HTMLInputElement).value.toLowerCase();
    setResults(
      data.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.number?.toString().includes(query)
      )
    );
  };

  const toggleForm = () => setShowForm((prev) => !prev);
  const toggle2Form = () => setShow2Form((prev) => !prev);

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    const isDuplicate = data.some((item) => item.name === newName.trim());
    if (isDuplicate) {
      alert("هذا الاسم موجود بالفعل. يرجى إدخال اسم مختلف.");
      return;
    }
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      const updatedData = [
        ...data,
        { name: newName, number: Number(newNumber) },
      ];
      setData(updatedData);
      setResults(updatedData);

      // تحديث الإحصائيات

      setNewName("");
      setNewNumber("");
      setShowForm(false);
    }
  };

  const handleUpdateNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedName) {
      alert("يرجى اختيار اسم للتحديث.");
      return;
    }
    const updatedData = data.map((item) => {
      if (item.name === selectedName) {
        let updatedNumber = item.number ?? 0;
        if (newDebt) updatedNumber += Number(newDebt);
        if (paymentAmount) updatedNumber -= Number(paymentAmount);

        // تحديث الإحصائيات
        if (newDebt) {
          setStatistics((prevStats) => [
            ...prevStats,
            {
              action: "إضافة دين جديد",
              name: selectedName,
              debt: newDebt,
              date: getTodayDate(),
            },
          ]);
        }
        if (paymentAmount) {
          setStatistics((prevStats) => [
            ...prevStats,
            {
              action: "إضافة دفعة",
              name: selectedName,
              payment: paymentAmount,
              date: getTodayDate(),
            },
          ]);
        }

        return { ...item, number: updatedNumber };
      }
      return item;
    });
    setData(updatedData);
    setResults(updatedData);
    setNewDebt("");
    setPaymentAmount("");
    setShow2Form(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => setSelectedItem(null);

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        {/* زر إضافة اسم ورقم جديد */}
        <button
          type="button"
          className="bg-gray-800 mx-3 hover:bg-gray-700"
          onClick={toggleForm}
          style={{
            color: "white",
            padding: "5px 10px",
            height: "50px",
            borderRadius: "5px",
            marginTop: "10px",
            bottom: "30px",
            fontSize: "20px",
          }}
        >
          اضافة
        </button>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className="bok-div-2"
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
              }}
            >
              <form onSubmit={handleAddName} style={{ textAlign: "center" }}>
                <h3 className="text-gray-800 text-xl font-bold py-5">
                  إضافة اسم جديد
                </h3>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ادخل الاسم"
                  style={{
                    padding: "10px 20px",
                    marginBottom: "10px",
                    width: "90%",
                  }}
                  className="rounded-lg my-3"
                />
                <input
                  type="number"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="ادخل الدين"
                  style={{
                    padding: "10px 20px",
                    marginBottom: "10px",
                    width: "90%",
                  }}
                  className="rounded-lg my-3"
                />
                <div className="my-3">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-400"
                    style={{
                      padding: "10px 50px",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      margin: "0 5px",
                    }}
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="bg-red-500 hover:bg-red-400"
                    style={{
                      padding: "10px 50px",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      margin: "0 5px",
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* زر تعديل ديون المستخدم */}
        <button
          type="button"
          onClick={toggle2Form}
          className="bg-green-500 hover:bg-green-400"
          style={{
            color: "white",
            padding: "5px 10px",
            height: "50px",
            borderRadius: "5px",
            marginTop: "10px",
            bottom: "30px",
            fontSize: "20px",
          }}
        >
          تعديل
        </button>

        {show2Form && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className="bok-div-2"
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
              }}
            >
              <form
                onSubmit={handleUpdateNumber}
                style={{ textAlign: "center" }}
              >
                <h3 className="text-gray-800 text-xl font-bold py-5">
                  تعديل الديون
                </h3>
                <select
                  value={selectedName}
                  className="my-3"
                  onChange={(e) => setSelectedName(e.target.value)}
                  style={{
                    padding: "6px 20px",
                    marginBottom: "10px",
                    width: "90%",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f9f9f9",
                    fontSize: "16px",
                    color: "#333",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#e7f0f7")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#f9f9f9")
                  }
                >
                  <option value="">اختر اسمًا</option>
                  {data.map((item, index) => (
                    <option key={index} value={item.name || ""}>
                      {item.name || "اسم غير محدد"}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={newDebt}
                  onChange={(e) => setNewDebt(e.target.value)}
                  placeholder="أدخل الدين"
                  style={{
                    padding: "10px 20px",
                    width: "90%",
                  }}
                  className="rounded-lg my-3"
                />
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="أدخل الدفعة"
                  style={{
                    padding: "10px 20px",
                    marginBottom: "10px",
                    width: "90%",
                  }}
                  className="rounded-lg my-3"
                />
                <div className="my-5">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-400"
                    style={{
                      padding: "10px 50px",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      margin: "0 5px",
                    }}
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    onClick={toggle2Form}
                    className="bg-red-500 hover:bg-red-400"
                    style={{
                      padding: "10px 50px",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      margin: "0 5px",
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        <input
          type="search"
          placeholder="ابحث هنا ..."
          onChange={(ev: CustomEvent) => handleInput(ev)}
          style={{ outline: "none" }}
          className=" w-full p-2 rounded-lg border border-solid border-gray-800"
        />
      </div>
      <nav>
        {results?.length > 0 ? (
          results.map((result, index) => (
            <div key={index} onClick={() => handleItemClick(result)}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="shadow-lg p-2 my-4 rounded-lg  text-gray-800 border border-solid border-gray-200"
              >
                <div>{result.name || "اسم غير محدد"}</div>
                <div style={{ color: "green" }} className="flex items-center">
                  <span>{result.number ?? 0}</span>
                  <span style={{ margin: "0 5px", fontWeight: "bold" }}>$</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="shadow-lg p-2 my-4 rounded-lg  text-gray-800 border border-solid border-gray-200">
            <p>لا توجد نتائج مطابقة</p>
          </div>
        )}
      </nav>

      {/* نافذة عرض التفاصيل */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bok-div-2"
            style={{
              position: "absolute",
              width: "90%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <h3>تفاصيل المستخدم</h3>
            <hr className="py-2 my-2" />
            <p>
              الاسم :
              <span className="mx-2"> {selectedItem.name || "غير محدد"}</span>
            </p>
            <hr className="py-2 my-2" />
            <p>
              الدين :
              <span className="mx-2 text-green-800">
                {" "}
                {selectedItem.number ?? 0}{" "}
                <span style={{ margin: "0 5px", fontWeight: "bold" }}>$</span>
              </span>
            </p>
            <hr className="py-2 my-2" />
            <p>
              التاريخ :<span className="mx-2"> {getTodayDate()}</span>
            </p>
            <hr className="py-2 my-2" />
            <h4>سجل العمليات:</h4>
            <hr className="py-2 my-2" />
            <ul>
              {statistics
                .filter((stat) => stat.name === selectedItem.name)
                .map((stat, index) => (
                  <li key={index}>
                    {stat.action} -{" "}
                    {stat.debt
                      ? `الدين: ${stat.debt} $`
                      : `الدفعة: ${stat.payment} $`}{" "}
                    - التاريخ: {stat.date}
                    <hr className="py-2 my-2" />
                  </li>
                ))}
            </ul>
            <button
              onClick={closeDetails}
              className="bg-red-500 hover:bg-red-400"
              style={{
                marginTop: "10px",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
