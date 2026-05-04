import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Plus, X, CheckCircle, Coffee, UtensilsCrossed, Trees, Wifi, Heart, Users, Briefcase, Star } from 'lucide-react';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { createPortal } from 'react-dom';

type Category = 'all' | 'coffee' | 'food' | 'parks' | 'wifi' | 'cultural' | 'community' | 'work';

interface CommunityPlace {
  id: string;
  name: string;
  category: Category;
  description: string;
  address?: string;
  addedBy: 'staff' | 'community';
  status: 'approved' | 'pending';
  createdAt: any;
}

const categoryIcons: Record<Category, any> = {
  all: Star,
  coffee: Coffee,
  food: UtensilsCrossed,
  parks: Trees,
  wifi: Wifi,
  cultural: Heart,
  community: Users,
  work: Briefcase,
};

const categoryColors: Record<Category, { bg: string; text: string; border: string }> = {
  all:       { bg: '#f1f5f9', text: '#374151', border: '#e2e8f0' },
  coffee:    { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
  food:      { bg: '#dcfce7', text: '#15803d', border: '#22c55e' },
  parks:     { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
  wifi:      { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
  cultural:  { bg: '#fce7f3', text: '#be185d', border: '#ec4899' },
  community: { bg: '#e0e7ff', text: '#4338ca', border: '#6366f1' },
  work:      { bg: '#f3e8ff', text: '#7e22ce', border: '#a855f7' },
};

export default function CommunityFavorites() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'he';
  const [places, setPlaces] = useState<CommunityPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'coffee' as Category,
    description: '',
    address: '',
  });

  const categories: { id: Category; labelKey: string }[] = [
    { id: 'all',       labelKey: 'community_places.filterAll' },
    { id: 'coffee',    labelKey: 'community_places.filterCoffee' },
    { id: 'food',      labelKey: 'community_places.filterFood' },
    { id: 'parks',     labelKey: 'community_places.filterParks' },
    { id: 'wifi',      labelKey: 'community_places.filterWifi' },
    { id: 'cultural',  labelKey: 'community_places.filterCultural' },
    { id: 'community', labelKey: 'community_places.filterCommunity' },
    { id: 'work',      labelKey: 'community_places.filterWork' },
  ];

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const q = query(
          collection(db, 'community_places'),
          where('status', '==', 'approved'),
        );
        const snapshot = await getDocs(q);
        const loaded: CommunityPlace[] = [];
        snapshot.forEach(doc => {
          loaded.push({ id: doc.id, ...doc.data() } as CommunityPlace);
        });
        setPlaces(loaded);
      } catch (error) {
        console.error('Error loading community places:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPlaces();
  }, []);

  const filtered = hasInteracted
    ? selectedCategory === 'all'
      ? places
      : places.filter(p => p.category === selectedCategory)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      await addDoc(collection(db, 'community_places'), {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        address: formData.address.trim(),
        addedBy: 'community',
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSubmitSuccess(true);
      setFormData({ name: '', category: 'coffee', description: '', address: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting place:', error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="py-20"
      style={{ background: '#fff7ed', borderTop: '1px solid #e5e7eb' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">


        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: '#fed7aa' }}
          >
            <Star className="w-8 h-8" style={{ color: '#ea580c' }} />
          </div>
          <h2 className="text-4xl font-bold mb-3" style={{ color: '#1e293b' }}>
            {t('community_places.title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('community_places.subtitle')}
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              marginTop: '20px',
              background: '#ea580c',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Plus style={{ width: '18px', height: '18px' }} />
            {t('community_places.shareButton')}
          </button>
        </div>

        {/* Submission Form Modal */}
        {showForm && createPortal(
  <>
    <div
      onClick={() => setShowForm(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 9998,
      }}
    />
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        zIndex: 9999,
      }}
    >
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold" style={{ color: '#1e293b' }}>
                 {t('community_places.formTitle')}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
              >
                  <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle
                    className="mx-auto mb-4"
                    style={{ width: '64px', height: '64px', color: '#10b981' }}
                  />
                  <p className="text-lg font-semibold text-gray-800">
                    {t('community_places.formSuccess')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Place Name */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#374151' }}
                    >
                      {t('community_places.formName')} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('community_places.formNamePlaceholder')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#374151' }}
                    >
                      {t('community_places.formCategory')} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {t(cat.labelKey)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#374151' }}
                    >
                      {t('community_places.formDescription')} *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder={t('community_places.formDescriptionPlaceholder')}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#374151' }}
                    >
                      {t('community_places.formAddress')}
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder={t('community_places.formAddressPlaceholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-600">{t('community_places.formError')}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      background: '#ea580c',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? t('community_places.formSubmitting') : t('community_places.formSubmit')}
                  </button>
                </form>
              )}
            </div>
          </>,
        document.body
      )}

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '24px',
            padding: '4px 4px',   // ⭐ adds breathing room
          }}
         >

          {categories.map(cat => {
            const Icon = categoryIcons[cat.id];
            const colors = categoryColors[cat.id];
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setHasInteracted(true);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? colors.text : 'rgba(255,255,255,0.9)',
                  color: isActive ? '#ffffff' : colors.text,
                  border: isActive ? 'none' : `1px solid ${colors.border}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.06)',
                }}
              >
                <Icon style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                <span>{t(cat.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Counter */}
        {hasInteracted && (
          <p className="text-sm text-gray-500 mb-4">
            {t('community_places.showing')} {filtered.length} {t('community_places.of')} {places.length} {t('community_places.places')}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: '#ea580c' }}
            />
            <p className="text-gray-500">{t('common.loading')}</p>
          </div>
        ) : !hasInteracted ? (
          <div className="text-center py-16">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗽</div>
            <p className="text-gray-500 text-lg font-medium">
              {t('community_places.selectPrompt')}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {t('community_places.selectSub')}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t('community_places.noPlaces')}</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
           >

            {filtered.map(place => {
              const Icon = categoryIcons[place.category] || Star;
              const colors = categoryColors[place.category] || categoryColors.all;
              return (
                <div
                  key={place.id}
                  className="bg-white rounded-2xl hover:shadow-lg transition-all"
                  style={{
                    border: '1px solid #e5e7eb',
                    padding: '12px',
                    paddingTop: '0',
                    borderTop: `4px solid ${colors.border}`,
                  }}
                 >
                  <div className="p-6">

                  {/* Badge row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: colors.bg,
                        color: colors.text,
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    >
                      <Icon style={{ width: '12px', height: '12px' }} />
                      {t(`community_places.filter${place.category.charAt(0).toUpperCase() + place.category.slice(1)}`)}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: place.addedBy === 'staff' ? '#ea580c' : '#6b7280',
                      }}
                    >
                      {place.addedBy === 'staff'
                        ? `⭐ ${t('community_places.staffPick')}`
                        : `👥 ${t('community_places.addedByCommunity')}`}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '8px',
                    }}
                  >
                    {place.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.6',
                      marginBottom: '14px',
                    }}
                  >
                    {place.description}
                  </p>

                  {/* Address */}
                  {place.address && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        marginBottom: '16px',
                      }}
                    >
                      <MapPin
                        style={{
                          width: '14px',
                          height: '14px',
                          color: '#9ca3af',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>
                        {place.address}
                      </span>
                    </div>
                  )}

                  {/* Directions button */}
                  {place.address && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 500,
                        background: colors.bg,
                        color: colors.text,
                        textDecoration: 'none',
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <MapPin style={{ width: '13px', height: '13px' }} />
                      {t('community_places.getDirections')}
                    </a>
                  )}
                </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}