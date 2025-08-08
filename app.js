const { useState } = React;

function App() {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        payment: "Credit Card"
    });
    const [orders, setOrders] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [notification, setNotification] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [user, setUser] = useState(() => {
        const email = localStorage.getItem('loggedInUser');
        if (!email) return null;
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (!users[email]) return null;
        return { email, ...users[email] };
    });
    const [showAddressForm, setShowAddressForm] = useState(false);

    // Helper to update user info in localStorage and state
    const updateUserInfo = (newInfo) => {
        if (!user) return;
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        users[user.email] = {...users[user.email], ...newInfo };
        localStorage.setItem('users', JSON.stringify(users));
        setUser({...user, ...newInfo });
    };


    const products = [{
            id: 1,
            name: "Nike Sneakers",
            price: 5000,
            category: "Shoes",
            image: "https://2.bp.blogspot.com/-PO_j6Bk93l8/VSPy9JRYKXI/AAAAAAAAqno/U8lY7_mKNX4/s1600/nike-running-shoes-red-and-whitenike-air-presto-2013.jpg"
        },
        {
            id: 2,
            name: "JBL Tune 770NC",
            price: 5999,
            category: "headphones",
            image: "https://wp.jomla.ae/wp-content/uploads/2023/09/JBL-Tune-770NC-Wireless-Over-Ear-Headphones-BlueT770NCBLU6925281974588.jpeg"
        },
        {
            id: 3,
            name: "Earpods Pro 5",
            price: 22000,
            category: "Earbuds",
            image: "https://images.fyndiq.se/images/f_auto/t_600x600/prod/fc5678535b4b4fb6/58eeee1f74f9/earpods-pro-5-wireless-bluetooth-earbuds-white.jpg"
        },
        {
            id: 4,
            name: "Bose Earbuds II",
            price: 17000,
            category: "Earbuds",
            image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/earbuds_500/product_silo_images/seb_product_slideshow_black_ec_05_web.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
        },
        {
            id: 5,
            name: "Galaxy Buds Pro",
            price: 15000,
            category: "Earbuds",
            image: "https://tse4.mm.bing.net/th/id/OIP.4ZEekgrLVjC42S6NH3RU0AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        {
            id: 6,
            name: "AirPods Max",
            price: 30000,
            category: "headphones",
            image: "https://www.bhphotovideo.com/images/images2500x2500/apple_mgyj3am_a_airpods_max_silver_1610234.jpg"
        },
        {
            id: 7,
            name: "Nike T-shirt",
            price: 1200,
            category: "T-Shirts",
            image: "https://cdn1.bambinifashion.com/img/p/1/8/3/9/8/2/183982--product-gallery@2x.jpg"
        },
        {
            id: 8,
            name: "Good Vibes T-Shirt",
            price: 699,
            category: "T-Shirts",
            image: "https://onerockin.com/wp-content/uploads/2022/08/Good-Vibes-Only-Eugenio-Suarez-Shirt_5_1.jpg"
        },
        {
            id: 9,
            name: "Leather Formal Shoes",
            price: 1999,
            category: "Shoes",
            image: "https://www.horex.in/wp-content/uploads/2019/05/2187_Black-NDM-1.jpg"
        },
        {
            id: 10,
            name: "Titan Watch",
            price: 1995,
            category: "Watches",
            image: "https://m.media-amazon.com/images/I/71o3lpjFCXL._AC_UL1500_.jpg"
        },
        {
            id: 11,
            name: "Fastrack Watch",
            price: 1000,
            category: "Watches",
            image: "https://rukminim1.flixcart.com/image/704/704/j431rbk0/watch/9/k/m/ng3039sp01c-fastrack-original-imaev2thd4f837wk.jpeg?q=70"
        },
        {
            id: 12,
            name: "Noice Smart Watch",
            price: 2000,
            category: "Watches",
            image: "https://m.media-amazon.com/images/I/61Q0R5cdxWL._SL1500_.jpg"
        },
        {
            id: 13,
            name: "Acer Laptop",
            price: 39000,
            category: "Laptops",
            image: "https://betanews.com/wp-content/uploads/2014/11/front.jpg"
        },
        {
            id: 14,
            name: "HP Laptop",
            price: 45000,
            category: "Laptops",
            image: "https://i5.walmartimages.com/asr/35b47efa-88ba-46ab-9faa-71096e67aed7.a7275eab204a8d8dc3d7949f0dbe74cc.jpeg"
        },
        {
            id: 15,
            name: "Vivo smartphone",
            price: 25000,
            category: "Mobile Phones",
            image: "https://www.91-img.com/pictures/152686-v1-vivo-v25-5g-256gb-mobile-phone-hres-7.jpg"
        },
        {
            id: 16,
            name: "Iphone 14 Pro",
            price: 120000,
            category: "Mobile Phones",
            image: "https://th.bing.com/th/id/OIP.KyrBu1s2mkrqDl3Bdo8QtAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
        },

    ];

    const filterByCategory = (product) =>
        categoryFilter === "All" || product.category === categoryFilter;



    const filtered = products.filter(
        (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        filterByCategory(p)
    );


    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find((item) => item.id === product.id);
            return found ?
                prev.map((item) =>
                    item.id === product.id ? {...item, qty: item.qty + 1 } : item
                ) :
                [...prev, {...product, qty: 1 }];
        });

        // Show popup
        setPopupMessage(`${product.name} added to cart 🛒`);
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 2500);
    };


    const updateQty = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, qty: Math.max(1, qty) } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Helper to update user address in localStorage and state
    const updateUserAddress = (newAddress) => {
        if (!user) return;
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        users[user.email].address = newAddress;
        localStorage.setItem('users', JSON.stringify(users));
        setUser({...user, address: newAddress });
    };

    // Prefill checkout form if logged in
    React.useEffect(() => {
        if (user) {
            setForm(f => ({
                ...f,
                name: user.name || user.email.split('@')[0],
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
            }));
        } else {
            setForm({ name: '', email: '', phone: '', address: '', payment: 'Credit Card' });
        }
    }, [user]);

    return ( <
        div className = "container" > { /* 🧭 Header */ } <
        div className = "header-bar" >
        <
        h1 > Shopping Booth🛍️ < /h1> <
        div style = {
            { display: 'flex', alignItems: 'center', gap: '1rem' } } > {
            user && ( <
                img src = { user.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent((user.name || user.email[0].toUpperCase()))}` }
                alt = "Account"
                className = "avatar-img"
                title = { user.name || user.email }
                style = {
                    { width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a78bfa' } }
                />
            )
        } <
        div className = "settings" >
        <
        button className = "button"
        onClick = {
            () => {
                const panel = document.querySelector(".settings-panel");
                panel.style.display =
                    panel.style.display === "none" ? "block" : "none";
            }
        } >
        ⚙️Settings <
        /button> <
        div className = "settings-panel"
        style = {
            { display: "none" } } >
        <
        button onClick = {
            () => {
                document.body.classList.remove("dark");
                document.body.classList.add("light");
            }
        }
        className = "button" >
        Light Mode☀️ <
        /button> <
        button onClick = {
            () => {
                document.body.classList.remove("light");
                document.body.classList.add("dark");
            }
        }
        className = "button"
        style = {
            { marginTop: "0.5rem" } } >
        Dark Mode🌙 <
        /button> {
            user && ( <
                >
                <
                button className = "button"
                style = {
                    { marginTop: '0.5rem', background: '#a78bfa', color: '#fff' } }
                onClick = {
                    () => setShowAddressForm(v => !v) } >
                { user.address ? 'Edit Address' : 'Add Address' } <
                /button> <
                button className = "button"
                style = {
                    { marginTop: '0.5rem', background: '#ef4444', color: '#fff' } }
                onClick = {
                    () => {
                        if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                            const users = JSON.parse(localStorage.getItem('users') || '{}');
                            delete users[user.email];
                            localStorage.setItem('users', JSON.stringify(users));
                            localStorage.removeItem('loggedInUser');
                            setUser(null);
                            window.location.reload();
                        }
                    }
                } >
                Delete Account <
                /button> <
                />
            )
        } <
        /div> <
        /div> { /* Login/Logout Button */ } <
        button className = "button login-btn"
        onClick = {
            () => {
                if (user) {
                    localStorage.removeItem('loggedInUser');
                    setUser(null);
                } else {
                    window.location.href = 'login.html';
                }
            }
        }
        style = {
            { marginLeft: '0.5rem' } } >
        { user ? 'Logout' : 'Login / Register' } <
        /button> <
        /div> <
        /div> {
            showPopup && ( <
                div style = {
                    {
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#4caf50",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        fontSize: "1rem",
                        zIndex: 1000,
                        transition: "opacity 0.3s ease-in-out"
                    }
                } >
                { popupMessage } <
                /div>
            )
        } {
            showAddressForm && user && ( <
                div style = {
                    { position: 'fixed', top: 80, right: 30, background: '#fff', border: '1px solid #a78bfa', borderRadius: 12, padding: 20, zIndex: 1000, boxShadow: '0 2px 12px #a78bfa33', minWidth: 260 } } >
                <
                h3 style = {
                    { marginBottom: 10 } } > Account Info < /h3> <
                input type = "text"
                value = { user.name || '' }
                onChange = { e => updateUserInfo({ name: e.target.value }) }
                placeholder = "Your Name"
                className = "input"
                style = {
                    { width: 220, marginBottom: 10 } }
                /> <
                input type = "tel"
                value = { user.phone || '' }
                onChange = { e => updateUserInfo({ phone: e.target.value }) }
                placeholder = "Phone Number"
                className = "input"
                style = {
                    { width: 220, marginBottom: 10 } }
                /> <
                input type = "text"
                value = { user.address || '' }
                onChange = { e => updateUserInfo({ address: e.target.value }) }
                placeholder = "Enter your address"
                className = "input"
                style = {
                    { width: 220, marginBottom: 10 } }
                /> <
                button className = "button"
                onClick = {
                    () => setShowAddressForm(false) }
                style = {
                    { marginLeft: 10 } } > Close < /button> <
                /div>
            )
        }


        { /* 🔍 Search Box */ } <
        div className = "search-box" >
        <
        input type = "text"
        placeholder = "🔍 Search products..."
        value = { search }
        onChange = {
            (e) => setSearch(e.target.value) }
        className = "input" /
        >
        <
        /div>

        { /* 🧰 Filters */ } <
        div className = "filters" >
        <
        select value = { categoryFilter }
        onChange = {
            (e) => setCategoryFilter(e.target.value) }
        className = "input" >
        <
        option value = "All" > All Categories < /option> <
        option value = "Shoes" > Shoes < /option> <
        option value = "Earbuds" > Earbuds < /option> <
        option value = "T-Shirts" > T - Shirts < /option> <
        option value = "headphones" > Headphones < /option> <
        option value = "Watches" > Watches < /option> <
        option value = "Laptops" > Laptops < /option> <
        option value = "Mobile Phones" > Mobile Phones < /option> <
        /select> <
        /div>

        { /* 🛍️ Product Grid */ } <
        div className = "product-list" > {
            filtered.length === 0 ? ( <
                p className = "no-results"
                style = {
                    {
                        fontSize: "2rem",
                        textAlign: "center",
                        marginTop: "2rem",
                        width: "100%",
                    }
                } >
                No results found <
                /p>
            ) : (
                filtered.map((p) => ( <
                    div key = { p.id }
                    className = "product" >
                    <
                    h2 > { p.name } < /h2> <
                    img src = { p.image }
                    alt = { p.name }
                    /> <
                    p > ₹{ p.price } < /p> <
                    button onClick = {
                        () => addToCart(p) }
                    className = "button" >
                    Add to Cart <
                    /button> <
                    /div>
                ))
            )
        } <
        /div>



        { /* 🧺 Cart */ } {
            notification && ( <
                div className = "notification"
                style = {
                    {
                        fontSize: "1.2rem",
                        color: "green",
                        textAlign: "center",
                        marginBottom: "1rem",
                    }
                } >
                { notification } <
                /div>
            )
        }

        <
        div className = "cart" >
        <
        h2 className = "cart-title" > 🧺Your Shopping Cart < /h2> {
            cart.length === 0 ? ( <
                p > Your cart is empty. < /p>
            ) : ( <
                >
                <
                ul > {
                    cart.map((item) => ( <
                        li key = { item.id }
                        className = "cart-item" >
                        <
                        span > { item.name } < strong > ₹{ item.price } < /strong> <
                        /span> <
                        input type = "number"
                        min = "1"
                        value = { item.qty }
                        onChange = {
                            (e) =>
                            updateQty(item.id, parseInt(e.target.value))
                        }
                        className = "cart-input" /
                        >
                        <
                        button onClick = {
                            () => removeFromCart(item.id) }
                        className = "remove-btn" >
                        Remove <
                        /button> <
                        /li>
                    ))
                } <
                /ul> <
                p className = "cart-total" >
                <
                strong >
                Total Amount: ₹{ cart.reduce((sum, item) => sum + item.price * item.qty, 0) } <
                /strong> <
                /p> <
                />
            )
        } <
        /div>



        { /* ✅ Checkout Form */ } <
        div className = "checkout" >
        <
        h2 > ✅Checkout < /h2> <
        input type = "text"
        placeholder = "Your Name"
        value = { form.name }
        onChange = {
            (e) => setForm({...form, name: e.target.value }) }
        className = "input" /
        >
        <
        input type = "email"
        placeholder = "Your Email"
        value = { form.email }
        onChange = {
            (e) => setForm({...form, email: e.target.value }) }
        className = "input" /
        >
        <
        input type = "phone number"
        placeholder = "Your Phone Number"
        value = { form.phone }
        onChange = {
            (e) => setForm({...form, phone: e.target.value }) }
        className = "input" /
        >
        <
        input type = "text"
        placeholder = "Shipping Address"
        value = { form.address }
        onChange = {
            (e) => setForm({...form, address: e.target.value }) }
        className = "input" /
        >
        <
        select value = { form.payment }
        onChange = {
            (e) => setForm({...form, payment: e.target.value }) }
        className = "input" >
        <
        option > Credit Card < /option> <
        option > Debit Card < /option> <
        option > UPI < /option> <
        option > Cash on Delivery < /option> <
        /select> <
        button onClick = {
            () => {
                if (!form.name || !form.email || !form.address) {
                    alert("Please complete all fields.");
                    return;
                }
                const total = cart.reduce(
                    (sum, item) => sum + item.price * item.qty,
                    0
                );
                setOrders((prev) => [
                    ...prev,
                    { buyer: form, items: cart, total }
                ]);
                setCart([]);
                setForm({
                    name: "",
                    email: "",
                    address: "",
                    payment: "Credit Card"
                });
                alert(
                    "✅ Your order has been placed successfully!\n\nThank you for shopping with us. We'll process your items and notify you once they're ready to ship 🚚✨"
                );
            }
        }
        className = "button" >
        Submit Order <
        /button> <
        /div>

        { /* 📦 Order History */ } <
        div className = "orders" >
        <
        h2 > 📦Order History < /h2> {
            orders.length === 0 ? ( <
                p > No orders yet. < /p>
            ) : (
                orders.map((order, i) => ( <
                    div key = { i }
                    className = "order-item" >
                    <
                    p >
                    <
                    strong > { order.buyer.name } < /strong> ({order.buyer.email})<br / > 📍Address: { order.buyer.address } < br / > 💳Payment Method: { order.buyer.payment } <
                    /p> <
                    ul > {
                        order.items.map((item) => ( <
                            li key = { item.id } > { item.name }× { item.qty } = ₹ { item.price * item.qty } <
                            /li>
                        ))
                    } <
                    /ul> <
                    p >
                    <
                    strong > Total: ₹{ order.total } < /strong> <
                    /p> <
                    /div>
                ))
            )
        } <
        /div> <
        /div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render( < App / > );