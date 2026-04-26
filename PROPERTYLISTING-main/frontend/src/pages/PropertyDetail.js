import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProperty, deleteProperty } from '../api';

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    const fetchProperty = async () => {
      try {
        const res = await getProperty(id);
        setProperty(res.data);
      } catch (err) {
        console.error('Failed to fetch property:', err);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteProperty(id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price?.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div>
      <Navbar />
      <div className="detail-container">
        <div className="detail-back" onClick={() => navigate('/dashboard')}>
          ← Back to Properties
        </div>

        <div className="detail-image">
          {property.imageUrl ? (
            <img src={property.imageUrl} alt={property.title} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'var(--radius)'}} />
          ) : (
            '🏠'
          )}
        </div>

        <div className="detail-header">
          <div>
            <div className="detail-price">{formatPrice(property.price)}</div>
            <h1 className="detail-title">{property.title || 'Untitled Property'}</h1>
            <div className="detail-location">📍 {property.location || 'No location specified'}</div>
          </div>
          <div className="detail-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/properties/edit/${property.id}`)}
              id="edit-property-btn"
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDelete(true)}
              id="delete-property-btn"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="detail-stats">
          <div className="detail-stat">
            <div className="detail-stat-value">{property.bedrooms || 0}</div>
            <div className="detail-stat-label">Bedrooms</div>
          </div>
          <div className="detail-stat">
            <div className="detail-stat-value">{property.bathrooms || 0}</div>
            <div className="detail-stat-label">Bathrooms</div>
          </div>
          <div className="detail-stat">
            <div className="detail-stat-value">{property.area || 0} sqft</div>
            <div className="detail-stat-label">Area</div>
          </div>
          <div className="detail-stat">
            <div className="detail-stat-value" style={{textTransform:'capitalize'}}>{property.type || 'House'}</div>
            <div className="detail-stat-label">Type</div>
          </div>
          <div className="detail-stat">
            <div className="detail-stat-value" style={{textTransform:'capitalize'}}>{property.status || 'Sale'}</div>
            <div className="detail-stat-label">Status</div>
          </div>
        </div>

        {property.description && (
          <div className="detail-section">
            <h2 className="detail-section-title">Description</h2>
            <p className="detail-description">{property.description}</p>
          </div>
        )}

        {/* Delete Modal */}
        {showDelete && (
          <div className="modal-overlay" onClick={() => setShowDelete(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-icon">⚠️</div>
              <h3>Delete this property?</h3>
              <p>"{property.title}" will be permanently removed. This cannot be undone.</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetail;
