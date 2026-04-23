import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createProperty, updateProperty, getProperty } from '../api';

function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    type: 'house',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'sale',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    if (isEdit) {
      const fetchProperty = async () => {
        try {
          const res = await getProperty(id);
          const p = res.data;
          setForm({
            title: p.title || '',
            location: p.location || '',
            price: p.price || '',
            description: p.description || '',
            type: p.type || 'house',
            bedrooms: p.bedrooms || '',
            bathrooms: p.bathrooms || '',
            area: p.area || '',
            status: p.status || 'sale',
            imageUrl: p.imageUrl || ''
          });
        } catch (err) {
          console.error('Failed to fetch property:', err);
          navigate('/dashboard');
        } finally {
          setFetching(false);
        }
      };
      fetchProperty();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) {
      setError('Title, location, and price are required');
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...form,
        price: parseFloat(form.price) || 0,
        bedrooms: parseInt(form.bedrooms) || 0,
        bathrooms: parseInt(form.bathrooms) || 0,
        area: parseFloat(form.area) || 0
      };

      if (isEdit) {
        await updateProperty(id, data);
      } else {
        await createProperty(data);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <div className="detail-back" onClick={() => navigate('/dashboard')}>
          ← Back to Properties
        </div>

        <div className="form-card">
          <h2 className="form-card-title">{isEdit ? '✏️ Edit Property' : '➕ Add New Property'}</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Property Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. Modern 3BHK Apartment"
                value={form.title}
                onChange={handleChange}
                id="property-title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. Bandra West, Mumbai"
                value={form.location}
                onChange={handleChange}
                id="property-location"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  placeholder="e.g. 5000000"
                  value={form.price}
                  onChange={handleChange}
                  id="property-price"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Area (sqft)</label>
                <input
                  type="number"
                  name="area"
                  className="form-input"
                  placeholder="e.g. 1200"
                  value={form.area}
                  onChange={handleChange}
                  id="property-area"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Property Type</label>
                <select name="type" className="form-select" value={form.type} onChange={handleChange} id="property-type">
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={form.status} onChange={handleChange} id="property-status">
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="form-input"
                  placeholder="e.g. 3"
                  value={form.bedrooms}
                  onChange={handleChange}
                  id="property-bedrooms"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="form-input"
                  placeholder="e.g. 2"
                  value={form.bathrooms}
                  onChange={handleChange}
                  id="property-bathrooms"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                className="form-input"
                placeholder="https://example.com/property-image.jpg"
                value={form.imageUrl}
                onChange={handleChange}
                id="property-imageUrl"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Describe the property features, amenities, and surroundings..."
                value={form.description}
                onChange={handleChange}
                id="property-description"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading} id="property-submit">
                {loading ? 'Saving...' : (isEdit ? 'Update Property' : 'Add Property')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyForm;
