const pool = require('../config/mysql');
const fs = require('fs');
const path = require('path');

// ➤ ADD ADVERTISEMENT
exports.addAd = async (req, res) => {
    try {
        const { redirect_link, start_date, end_date, is_active, display_order } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const image_url = `/uploads/${req.file.filename}`;

        await pool.execute(
            'INSERT INTO advertisements (image_url, redirect_link, start_date, end_date, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?)',
            [image_url, redirect_link, start_date, end_date, is_active === 'true' ? 1 : 0, display_order || 0]
        );

        res.json({ success: true, message: 'Advertisement added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ➤ GET ALL ADVERTISEMENTS
exports.getAllAds = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM advertisements ORDER BY display_order ASC'
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ➤ GET ACTIVE ADVERTISEMENTS FOR HOMEPAGE
exports.getActiveAd = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM advertisements WHERE is_active = 1 ORDER BY display_order ASC'
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No active advertisements found' });
        }

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching active ad:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ➤ UPDATE ADVERTISEMENT
exports.updateAd = async (req, res) => {
    try {
        const { id } = req.params;
        const { redirect_link, start_date, end_date, is_active, display_order } = req.body;
        
        // Check if new image is uploaded
        let query = 'UPDATE advertisements SET redirect_link = ?, start_date = ?, end_date = ?, is_active = ?, display_order = ?';
        let params = [redirect_link, start_date, end_date, is_active === 'true' ? 1 : 0, display_order || 0];

        if (req.file) {
            // Delete old image if possible
            const [oldRows] = await pool.execute('SELECT image_url FROM advertisements WHERE id = ?', [id]);
            if (oldRows.length > 0 && oldRows[0].image_url) {
                const oldFilename = path.basename(oldRows[0].image_url);
                const oldPath = path.join(__dirname, '..', 'public', 'uploads', oldFilename);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            const image_url = `uploads/ads/${req.file.filename}`;
            query += ', image_url = ?';
            params.push(image_url);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await pool.execute(query, params);

        res.json({ success: true, message: 'Advertisement updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ➤ DELETE ADVERTISEMENT
exports.deleteAd = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete image file first
        const [rows] = await pool.execute('SELECT image_url FROM advertisements WHERE id = ?', [id]);
        if (rows.length > 0 && rows[0].image_url) {
            const oldFilename = path.basename(rows[0].image_url);
            const filePath = path.join(__dirname, '..', 'public', 'uploads', oldFilename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await pool.execute('DELETE FROM advertisements WHERE id = ?', [id]);

        res.json({ success: true, message: 'Advertisement deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ➤ TOGGLE ACTIVE STATUS
exports.toggleAdStatus = async (req, res) => {
    try {
        const { id } = req.params;
        
        await pool.execute(
            'UPDATE advertisements SET is_active = NOT is_active WHERE id = ?',
            [id]
        );

        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
