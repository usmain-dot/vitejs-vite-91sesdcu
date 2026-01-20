import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { ArrowLeft, Calendar as CalendarIcon, Clock, X, CheckCircle, AlertCircle } from 'lucide-react';

interface Appointment {
  id: string;
  userId: string;
  userName: string;
  serviceId: number;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
  createdAt: Timestamp;
}

interface AppointmentsProps {
  serviceId?: number;
  serviceName?: string;
  onClose: () => void;
}

export default function Appointments({ serviceId, serviceName, onClose }: AppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const currentUser = auth.currentUser;

  // Time slots available
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  // Get max date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Load user's appointments
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appts: Appointment[] = [];
      snapshot.forEach((doc) => {
        appts.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      
      // Sort by date and time
      appts.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
      });
      
      setAppointments(appts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // If serviceId provided, show booking form
  useEffect(() => {
    if (serviceId && serviceName) {
      setShowBookingForm(true);
    }
  }, [serviceId, serviceName]);

  // Book appointment
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedDate || !selectedTime) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'User',
        serviceId: serviceId || 0,
        serviceName: serviceName || 'Service',
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        notes: notes.trim(),
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setTimeout(() => {
        setShowBookingForm(false);
        setSuccess(false);
        setSelectedDate('');
        setSelectedTime('');
        setNotes('');
      }, 2000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Check if appointment is upcoming
  const isUpcoming = (dateStr: string, timeStr: string) => {
    const apptDate = new Date(dateStr + 'T' + convertTo24Hour(timeStr));
    return apptDate > new Date();
  };

  // Convert 12-hour time to 24-hour
  const convertTo24Hour = (time: string) => {
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#2a9df4' }}></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
 <div className="flex h-screen max-h-screen bg-gray-50">
   <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" style={{ color: '#2a9df4' }} />
              <h1 className="text-xl font-bold text-gray-800">Appointments</h1>
            </div>
             </div>
          </div>
          {!showBookingForm && (
            <button
              onClick={() => setShowBookingForm(true)}
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ background: '#2a9df4' }}
            >
              Book New
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Booking Form */}
        {showBookingForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Book Appointment</h2>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setSelectedDate('');
                  setSelectedTime('');
                  setNotes('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {serviceName && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-semibold text-gray-800">{serviceName}</p>
              </div>
            )}

            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Booked!</h3>
                <p className="text-gray-600">You'll receive a confirmation soon.</p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    max={maxDateStr}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific requests or information..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedTime}
                  className="w-full py-3 rounded-lg text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#2a9df4' }}
                >
                  {submitting ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Appointments List */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No appointments yet</p>
              <p className="text-gray-400 text-sm mt-2">Book your first appointment with a service provider!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => {
                const upcoming = isUpcoming(appointment.date, appointment.time);
                return (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-lg shadow-md p-6 border-l-4"
                    style={{
                      borderLeftColor:
                        appointment.status === 'confirmed'
                          ? '#10b981'
                          : appointment.status === 'cancelled'
                          ? '#ef4444'
                          : '#f59e0b'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {appointment.serviceName}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                            <p className="font-medium mb-1">Notes:</p>
                            <p>{appointment.notes}</p>
                          </div>
                        )}

                        {!upcoming && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <AlertCircle className="w-4 h-4" />
                            <span>This appointment has passed</span>
                          </div>
                        )}
                      </div>

                      {upcoming && appointment.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
