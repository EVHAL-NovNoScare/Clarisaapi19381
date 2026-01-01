module.exports = async (req, res) => {
  // Izinkan GET & POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let user_id, zone_id;
    
    if (req.method === 'POST') {
      const body = JSON.parse(req.body || '{}');
      user_id = body.user_id;
      zone_id = body.zone_id;
    } else {
      // GET: ambil dari query string
      user_id = req.query.user_id || '123456789';
      zone_id = req.query.zone_id || '1011';
    }

    if (!user_id || !zone_id) {
      return res.status(400).json({
        status: false,
        error: 'user_id dan zone_id diperlukan'
      });
    }

    // Dummy logic
    const hasPurchased50 = Math.random() > 0.5;
    const hasPurchased150 = Math.random() > 0.7;
    const hasPurchased250 = Math.random() > 0.8;
    const hasPurchased500 = Math.random() > 0.9;

    const response = {
      status: true,
      data: {
        user_id,
        zone_id,
        nickname: "PanelPedia",
        country: "Indonesia",
        rechargeBonus: [
          { diamonds: "50+50", status: hasPurchased50 ? "Sudah pernah dibeli" : "Belum pernah dibeli" },
          { diamonds: "150+150", status: hasPurchased150 ? "Sudah pernah dibeli" : "Belum pernah dibeli" },
          { diamonds: "250+250", status: hasPurchased250 ? "Sudah pernah dibeli" : "Belum pernah dibeli" },
          { diamonds: "500+500", status: hasPurchased500 ? "Sudah pernah dibeli" : "Belum pernah dibeli" }
        ]
      }
    };

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(response);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      status: false, 
      error: 'Internal server error' 
    });
  }
};
