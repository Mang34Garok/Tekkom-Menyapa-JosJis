import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Akun = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(() => {
    const u = JSON.parse(localStorage.getItem("currentUser") || "null");
    return u ? { ...u, phone: u.phone || "" } : null;
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo || "",
    userId: user?.id || "",
  });
  const [saveToServer, setSaveToServer] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, photo: ev.target?.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      let photoUrl = user.photo || "";

      // If user chose to save to server and a file is selected, upload it
      const file = fileInputRef.current?.files?.[0];
      if (saveToServer && file) {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("userId", user.id);

        const uploadRes = await fetch("http://localhost:3001/api/upload-photo", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          alert(uploadData.error || "Upload foto gagal");
          return;
        }

        photoUrl = uploadData.photo; // e.g. /galeri/1.jpg
      } else if (!saveToServer && form.photo) {
        // keep client-side data URL
        photoUrl = form.photo;
      }

      // prepare body for update; include photo only if saved to server
      const updateBody: any = { userId: user.id, email: form.email, fullName: form.fullName, phone: form.phone };
      if (saveToServer) updateBody.photo = photoUrl;

      const response = await fetch("http://localhost:3001/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBody),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Gagal memperbarui profil.");
        return;
      }

      // update localStorage and local state with resulting photo (either server path or data URL)
      const updated = {
        id: user.id,
        is_admin: user.is_admin,
        email: form.email,
        fullName: form.fullName,
        phone: form.phone,
        photo: photoUrl,
      };
      setUser(updated);
      localStorage.setItem("currentUser", JSON.stringify(updated));
      setEdit(false);
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      alert("Gagal menghubungi server.");
    }
  };


  const handleDeletePhoto = () => {
    setForm((f) => ({ ...f, photo: "" }));
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Semua field password wajib diisi.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Password baru dan konfirmasi tidak cocok.');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password baru minimal 6 karakter.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Gagal mengganti password.');
        return;
      }
      alert(data.message || 'Password berhasil diubah.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungi server.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen news-background flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <div className="relative mb-4">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-yellow-500 flex items-center justify-center text-4xl text-gray-500">
                {form.fullName ? form.fullName[0] : "?"}
              </div>
            )}
            {edit && form.photo && (
              <button
                onClick={handleDeletePhoto}
                className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 text-xs hover:bg-red-100"
                title="Hapus Foto"
              >
                Hapus
              </button>
            )}
          </div>
          {edit ? (
            <>
              <input
                type="file"
                name="photo"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="mb-2"
              />
              <div className="flex items-center gap-2 mb-2">
                <input
                  id="saveToServer"
                  type="checkbox"
                  checked={saveToServer}
                  onChange={e => setSaveToServer(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="saveToServer" className="text-sm">Simpan foto ke server (agar tampil di perangkat lain)</label>
              </div>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input type="hidden" name="userId" value={form.userId} />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="No HP"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
                >
                  Simpan
                </button>
                <button
                  onClick={() => { setEdit(false); setForm({ ...user }); }}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors"
                >
                  Batal
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.fullName}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-2">{user.phone || <span className="italic text-gray-400">Belum diisi</span>}</p>
              <button
                onClick={() => setEdit(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Edit Profil
              </button>
              <button
                onClick={() => setShowChangePassword(true)}
                className="mt-2 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
              >
                Ganti Password
              </button>
              <button
                onClick={() => navigate(-1)}
                className="mt-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Kembali
              </button>
            </>
          )}
        </div>
      </div>
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Ganti Password</h3>
            <input
              type={showPasswordFields ? "text" : "password"}
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordInput}
              placeholder="Password Saat Ini"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type={showPasswordFields ? "text" : "password"}
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordInput}
              placeholder="Password Baru"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type={showPasswordFields ? "text" : "password"}
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordInput}
              placeholder="Konfirmasi Password Baru"
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPasswordFields}
                onChange={(e) => setShowPasswordFields(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showPassword" className="text-sm">Tampilkan password</label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowChangePassword(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Akun;
