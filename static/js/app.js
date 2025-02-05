// Function to add a message to the chat
function addMessage(text, type, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${type}-message`);
    
    if (isHTML) {
        messageDiv.innerHTML = text;
    } else {
        messageDiv.textContent = text;
    }
    
    document.getElementById('chatMessages').appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}

// Demo conversation data
const demoMessages = [
    {
        type: 'bot',
        text: 'Merhaba! Ben EY\'nin moda tasarım asistanıyım. Size nasıl yardımcı olabilirim?'
    },
    {
        type: 'user',
        text: 'Geçmiş satış verilerine dayanarak iyi satış yapabilecek bir kadın kış montu tasarlar mısın?'
    },
    {
        type: 'bot',
        text: 'Tabii ki! Sol panelde görüntülenen tasarımı oluşturdum. Bu tasarım, geçmiş satış verilerimizi ve güncel trendleri analiz ederek optimize edildi. Size detayları aktarayım:'
    },
    {
        type: 'bot',
        text: `Tasarım Detayları:

1. Malzeme Seçimi:
- %70 Yün: Üstün ısı yalıtımı ve dayanıklılık
- %25 Kaşmir: Lüks his ve yumuşaklık
- %5 Elastan: Hareket özgürlüğü ve form koruma

2. Tasarım Özellikleri:
- Oversize kesim (Mevcut trendlere uygun)
- Midi boy (90cm) - En çok tercih edilen uzunluk
- Çift sıra düğme detayı
- Ayarlanabilir kemer
- Geniş yaka tasarımı

3. Renk Seçimi:
- Karamel bej tonu (Geçen sezon %42 satış artışı gösterdi)
- Hem casual hem business stile uygun
- Sezonun trend renklerinden biri`
    },
    {
        type: 'user',
        text: 'Satış potansiyeli hakkında ne düşünüyorsun?'
    },
    {
        type: 'bot',
        text: `Sol paneldeki grafikte görebileceğiniz üzere, benzer tasarımlar son üç ayda güçlü bir performans gösterdi. Bu yeni tasarım için tahminlerim:

1. Satış Tahminleri:
- İlk ay: 3200-3500 adet
- Üç aylık projeksiyon: 9500-10000 adet

2. Hedef Kitle Analizi:
- Birincil: 28-45 yaş arası çalışan profesyoneller
- İkincil: 24-35 yaş arası moda odaklı tüketiciler

3. Fiyatlandırma Önerisi:
- Premium segment: 4999₺
- Lansman fiyatı (ilk 2 hafta): 4499₺
- Beklenen kar marjı: %45-50

4. Büyüme Potansiyeli:
- Mevcut koleksiyon geçen yıla göre %16-22 büyüme gösterdi
- Bu tasarımla %25-30 ek büyüme hedeflenebilir`
    },
    {
        type: 'bot',
        text: `Önerilen Pazarlama Stratejisi:

1. Lansman Zamanlaması:
- Eylül sonu lansman (Sezon başlangıcı)
- Influencer iş birlikleri ile ön tanıtım
- Mağaza vitrinlerinde özel yerleştirme

2. Hedef Lokasyonlar:
- Öncelikli: İstanbul, Ankara, İzmir
- Yüksek potansiyel: Bursa, Antalya

3. Satış Kanalları:
- Fiziksel mağazalar: %60
- Online satış: %40
- Kurumsal satış fırsatları`
    }
];

// Function to load the demo conversation
function loadDemoConversation() {
    let delay = 0;
    demoMessages.forEach(msg => {
        setTimeout(() => {
            if (msg.html) {
                addMessage(msg.html, msg.type, true);
            } else {
                addMessage(msg.text, msg.type, false);
            }
        }, delay);
        delay += 1000;
    });
}

// Start the demo conversation when the page loads
document.addEventListener('DOMContentLoaded', loadDemoConversation);

// Handle send button clicks
document.getElementById('sendButton').addEventListener('click', () => {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
    }
});