'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, CalendarDays, ChevronRight, CircleHelp, CreditCard, Info, LogOut, MapPin, Bell, Trash2, UserRound, ShoppingBag, Wallet, Users, Clock, Utensils, Star, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FoodArt, NovaLogo, ScreenHeader } from '@/components/MobileNav';

export function MobileCart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, subtotal, deliveryFee, total } = useApp();
  return <div className="mobile-page mobile-cart-page"><ScreenHeader title="Cart" back right={<button aria-label="Clear cart" onClick={clearCart}><Trash2 size={20}/></button>}/>
    {cart.length ? <><div className="mobile-cart-list">{cart.map((row,index)=><article className="mobile-cart-card" key={row.cartItemId}><FoodArt kind={index%2?'pasta':'steak'} src={row.menuItem.image} alt={row.menuItem.name}/><div><strong>{row.menuItem.name}</strong><small>${row.unitPrice.toFixed(2)} each</small><div className="quantity-control"><button aria-label="Decrease quantity" onClick={()=>updateCartQuantity(row.cartItemId,-1)}>−</button><span>{row.quantity}</span><button aria-label="Increase quantity" onClick={()=>updateCartQuantity(row.cartItemId,1)}>＋</button></div></div><b>${row.totalPrice.toFixed(2)}</b></article>)}</div>
      <div className="mobile-total-card"><p><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p><p><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></p><hr/><strong><span>Total</span><b>${total.toFixed(2)}</b></strong></div>
    <Link href="/checkout" className="mobile-cta mobile-sticky-cta">Proceed to Checkout <ArrowRight size={19}/></Link></> : <div className="mobile-empty"><div><ShoppingBag size={44}/></div><h2>Your cart is empty</h2><p>Find something delicious on our menu.</p><Link href="/menu" className="mobile-cta">Explore Menu</Link></div>}
  </div>;
}

export function MobileWelcome() {
  return <div className="mobile-welcome"><div className="welcome-brand"><NovaLogo/><div>NOVA</div><b>DINER</b><small>Dine · Order · Enjoy</small></div><FoodArt kind="steak" src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" alt="Grilled steak"/><div className="welcome-actions"><Link href="/" className="mobile-cta">Get Started <ArrowRight size={20}/></Link><p>Already have an account? <Link href="/profile">Sign in</Link></p></div></div>;
}

export function MobileCheckout() {
  const { user, cart, subtotal, total, deliveryFee, createOrder } = useApp();
  const router = useRouter();
  const [payment, setPayment] = useState<'card'|'cash'>('card');
  const [busy, setBusy] = useState(false);
  async function placeOrder() {
    if (!cart.length || !user) { router.push('/menu'); return; }
    setBusy(true);
    try { await createOrder({ customerName:user.name, customerPhone:user.phone || '', customerEmail:user.email, orderType:'delivery', deliveryAddress:user.savedAddresses[0], paymentMethod:payment==='cash'?'cash':'card' }); router.push('/orders'); }
    finally { setBusy(false); }
  }
  return <div className="mobile-page mobile-checkout-page"><ScreenHeader title="Checkout"/>
    <section><h2>Delivery Address</h2><div className="mobile-panel address-panel"><span className="gold-icon"><MapPin/></span><div><strong>{user?.savedAddresses[0]?.label || 'Home'}</strong><p>{user?.savedAddresses[0]?.street || '123 Park Avenue'}, {user?.savedAddresses[0]?.city || 'Bulawayo'}, Zimbabwe</p></div><button>Change</button></div></section>
    <section><h2>Payment Method</h2>{[['card','Card Payment',CreditCard],['cash','Cash on Delivery',Wallet]].map(([id,label,Icon]:any)=><button key={id} className={`mobile-panel payment-option ${payment===id?'chosen':''}`} onClick={()=>setPayment(id)}><i/ ><Icon size={21}/><strong>{label}</strong></button>)}</section>
    <section><h2>Order Summary</h2><div className="mobile-panel mobile-total-card"><p><span>Items ({cart.reduce((n,r)=>n+r.quantity,0)})</span><span>${subtotal.toFixed(2)}</span></p><p><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></p><hr/><strong><span>Total</span><b>${total.toFixed(2)}</b></strong></div></section>
    <button onClick={placeOrder} disabled={busy} className="mobile-cta mobile-sticky-cta">{busy?'Placing Order…':'Place Order'}</button>
  </div>;
}

export function MobileOrders() {
  const { orders } = useApp(); const [filter,setFilter]=useState('All');
  const filtered=orders.filter(o=>filter==='All'||(filter==='Active'?!['delivered','cancelled'].includes(o.status):o.status==='delivered'));
  return <div className="mobile-page mobile-orders-page"><ScreenHeader title="My Orders"/><div className="mobile-pills">{['All','Active','Completed'].map(f=><button key={f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="mobile-menu-list">{filtered.map((o,index)=><Link href={`/track-order?id=${o.id}`} className="mobile-order-card" key={o.id}><FoodArt kind={index?'pasta':'steak'} src={o.items[0]?.menuItem.image} alt={o.items[0]?.menuItem.name || 'Order item'}/><div><span className={`order-status ${o.status==='delivered'?'done':''}`}>{o.status==='preparing'?'Preparing':o.status}</span><strong>Order #{o.orderNumber}</strong><small>{new Date(o.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} · {new Date(o.createdAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</small><b>{o.items.length} {o.items.length===1?'item':'items'} · ${o.total.toFixed(2)}</b></div><ChevronRight/></Link>)}</div></div>;
}

export function MobileProfile() {
  const { user, logout } = useApp(); const router=useRouter();
  const rows=[['My Orders', '/orders', ShoppingBag],['My Bookings','/reservations',CalendarDays],['Addresses','/account',MapPin],['Payment Methods','/account',CreditCard],['Notifications','/account',Bell],['Help & Support','/account',CircleHelp],['About Nova Diner','/about',Info]] as const;
  return <div className="mobile-page mobile-profile"><ScreenHeader title="Profile" back/><div className="profile-summary"><div className="profile-avatar"><UserRound/></div><strong>{user?.name || 'Your Name'}</strong><small>{user?.email || 'you@example.com'}</small></div><div className="profile-links">{rows.map(([name,href,Icon])=><Link key={name} href={href}><Icon/><span>{name}</span><ChevronRight/></Link>)}</div><button className="logout-button" onClick={()=>{logout();router.push('/')}}><LogOut/> Log Out</button></div>;
}

export function MobileAbout() {
  return <div className="mobile-page mobile-about"><ScreenHeader title="Our Restaurant" back right={<Share2 size={20}/>}/><div className="about-hero"><FoodArt kind="restaurant" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop" alt="Nova Diner restaurant interior"/><span><Star size={18}/><Star size={18}/><Star size={18}/></span><b>Nova Diner</b></div><section><h1>About Nova Diner</h1><p>Nova Diner is more than just a restaurant. It&apos;s an experience. Enjoy delicious meals, a cozy atmosphere and exceptional service in the heart of Bulawayo.</p><div className="about-perk"><Utensils/> Modern Cuisine</div><div className="about-perk"><Star/> Premium Service</div><div className="about-perk"><MapPin/> Prime Location</div><div className="about-photos"><FoodArt kind="restaurant" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop" alt="Warm dining room"/><FoodArt kind="restaurant" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop" alt="Dining table"/></div><a className="mobile-cta" href="https://maps.google.com/?q=Nova+Diner+Bulawayo"><MapPin size={18}/> Visit Us</a></section></div>;
}

export function MobileReservation() {
  const { user, tables, reservations, createReservation } = useApp();
  const [date,setDate]=useState(new Date(Date.now()+86400000).toISOString().slice(0,10)); const [time,setTime]=useState('19:00'); const [guests,setGuests]=useState(2); const [done,setDone]=useState(false);
  async function book(){const table=tables.find(t=>t.capacity>=guests&& !reservations.some(r=>r.date===date&&r.time===time&&r.tableId===t.id));if(!table){alert('No table is available at this time.');return;} await createReservation({userId:user?.id,customerName:user?.name||'Guest',customerPhone:user?.phone||'',customerEmail:user?.email||'',date,time,guests,seatingPreference:'indoor',tableId:table.id,tableNumber:table.number,occasion:'casual',specialRequests:''});setDone(true);}
  return <div className="mobile-page mobile-reservation"><ScreenHeader title="Book a Table" right={<CalendarDays/>}/><div className="reservation-cover"><FoodArt kind="restaurant" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop" alt="Nova Diner dining room"/></div><section><h1>Reserve Your Table</h1><p>Enjoy a special dining experience.</p><label className="mobile-panel input-panel"><CalendarDays/><span><small>Select Date</small><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></span></label><label className="mobile-panel input-panel"><Clock/><span><small>Select Time</small><input type="time" value={time} onChange={e=>setTime(e.target.value)}/></span></label><label className="mobile-panel input-panel"><Users/><span><small>Number of Guests</small><select value={guests} onChange={e=>setGuests(Number(e.target.value))}>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} Guests</option>)}</select></span></label><button className="mobile-cta" onClick={book}>{done?'Table Booked ✓':'Book Table'}</button></section></div>;
}
