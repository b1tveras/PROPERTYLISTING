import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProperties, deleteProperty } from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }
    fetchProperties();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const res = await getProperties();
      setProperties(res.data);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProperty(deleteId);
      setProperties(properties.filter(p => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price?.toLocaleString('en-IN')}`;
  };

  const getStatusBadge = (status) => {
    const s = (status || 'sale').toLowerCase();
    if (s === 'rent') return 'rent';
    if (s === 'sold') return 'sold';
    return 'sale';
  };

  const filtered = properties.filter(p => {
    const matchSearch = !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (p.type || '').toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
  const forSale = properties.filter(p => (p.status || 'sale').toLowerCase() === 'sale').length;
  const forRent = properties.filter(p => (p.status || '').toLowerCase() === 'rent').length;

  return (
    <div>
      <Navbar />
      <div className="page-container">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon purple">🏘️</div>
            <div>
              <div className="stat-value">{properties.length}</div>
              <div className="stat-label">Total Properties</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">💰</div>
            <div>
              <div className="stat-value">{formatPrice(totalValue)}</div>
              <div className="stat-label">Total Value</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">🏷️</div>
            <div>
              <div className="stat-value">{forSale}</div>
              <div className="stat-label">For Sale</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber">🔑</div>
            <div>
              <div className="stat-value">{forRent}</div>
              <div className="stat-label">For Rent</div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Properties</h1>
            <p className="page-subtitle">Manage your property listings</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/properties/new')} id="add-property-btn">
            + Add Property
          </button>
        </div>

        {/* Search & Filter */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search-input"
            />
          </div>
          <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)} id="filter-type">
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏠</div>
            <h3>{properties.length === 0 ? 'No properties yet' : 'No matching properties'}</h3>
            <p>{properties.length === 0 ? 'Add your first property to get started' : 'Try adjusting your search or filter'}</p>
            {properties.length === 0 && (
              <button className="btn btn-primary" onClick={() => navigate('/properties/new')}>
                + Add Your First Property
              </button>
            )}
          </div>
        ) : (
          <div className="property-grid">
            {filtered.map(property => (
              <div
                key={property.id}
                className="property-card"
                onClick={() => navigate(`/properties/${property.id}`)}
                id={`property-card-${property.id}`}
              >
                <div className="property-image">
                  {property.imageUrl ? (
                    <img src={property.imageUrl} alt={property.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  ) : (
                    '🏠'
                  )}
                  <span className={`property-badge ${getStatusBadge(property.status)}`}>
                    {property.status || 'Sale'}
                  </span>
                </div>
                <div className="property-content">
                  <div className="property-price">{formatPrice(property.price)}</div>
                  <div className="property-title">{property.title || 'Untitled Property'}</div>
                  <div className="property-location">📍 {property.location || 'No location'}</div>
                  <div className="property-meta">
                    <div className="property-meta-item">🛏️ <span>{property.bedrooms || 0}</span> Beds</div>
                    <div className="property-meta-item">🚿 <span>{property.bathrooms || 0}</span> Baths</div>
                    <div className="property-meta-item">📐 <span>{property.area || 0}</span> sqft</div>
                    <div className="property-meta-item" style={{marginLeft:'auto'}}>
                      <span style={{textTransform:'capitalize',color:'var(--text-muted)',fontSize:'0.75rem'}}>
                        {property.type || 'House'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {deleteId && (
          <div className="modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-icon">⚠️</div>
              <h3>Delete Property?</h3>
              <p>This action cannot be undone. The property will be permanently removed.</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
