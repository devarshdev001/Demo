import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  tableNumber?: string;
  timestamp?: string;
  orderId?: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      const stored = localStorage.getItem('queueless_notifications');
      if (stored) {
        const loadedNotifications = JSON.parse(stored);
        
        // Update relative time for each notification
        const updatedNotifications = loadedNotifications.map((notif: Notification) => {
          if (notif.timestamp) {
            const timeAgo = getTimeAgo(notif.timestamp);
            return { ...notif, time: timeAgo };
          }
          return notif;
        });
        
        setNotifications(updatedNotifications);
      }
    };

    loadNotifications();

    // Refresh notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to calculate time ago
  const getTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const notifTime = new Date(timestamp).getTime();
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('queueless_notifications', JSON.stringify(updatedNotifications));
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('queueless_notifications', JSON.stringify(updatedNotifications));
  };

  const handleDelete = (id: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('queueless_notifications', JSON.stringify(updatedNotifications));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Bell className="h-5 w-5" />;
      case 'payment':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'system':
        return <Clock className="h-5 w-5" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-gradient-to-br from-orange-500 to-amber-600';
      case 'payment':
        return 'bg-gradient-to-br from-green-500 to-emerald-600';
      case 'system':
        return 'bg-gradient-to-br from-blue-500 to-indigo-600';
      case 'alert':
        return 'bg-gradient-to-br from-red-500 to-rose-600';
      default:
        return 'bg-gradient-to-br from-orange-500 to-amber-600';
    }
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-orange-900">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-600">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
        <p className="text-orange-700">Stay updated with your restaurant activity</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          className={
            filter === 'all'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
              : 'border-orange-200 text-orange-700'
          }
        >
          All Notifications
        </Button>
        <Button
          onClick={() => setFilter('unread')}
          variant={filter === 'unread' ? 'default' : 'outline'}
          className={
            filter === 'unread'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
              : 'border-orange-200 text-orange-700'
          }
        >
          Unread Only
        </Button>
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            variant="outline"
            className="ml-auto border-orange-200 text-orange-700"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          // Check if notification is very recent (within 5 minutes)
          const isNewNotification = notification.timestamp && 
            (new Date().getTime() - new Date(notification.timestamp).getTime()) < 300000; // 5 minutes
          
          return (
            <Card
              key={notification.id}
              className={`p-6 border-orange-200 hover:shadow-lg transition-all duration-300 ${
                !notification.read 
                  ? isNewNotification 
                    ? 'bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 border-orange-400 border-2 shadow-xl animate-pulse' 
                    : 'bg-orange-50'
                  : ''
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl ${getIconColor(notification.type)} flex items-center justify-center shrink-0 shadow-lg ${
                  isNewNotification && !notification.read ? 'ring-4 ring-orange-300 ring-opacity-50' : ''
                }`}>
                  <div className="text-white">
                    {getIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-orange-900">{notification.title}</h3>
                        {!notification.read && (
                          <div className={`w-2 h-2 rounded-full bg-orange-500 ${
                            isNewNotification ? 'animate-ping' : ''
                          }`}></div>
                        )}
                      </div>
                      {notification.tableNumber && (
                        <Badge variant="outline" className="border-orange-200 text-orange-700 mb-2">
                          Table #{notification.tableNumber}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(notification.id)}
                      className="text-orange-600 hover:text-red-600 hover:bg-red-50 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-orange-700 mb-3">{notification.message}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-600">{notification.time}</span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-orange-600 hover:bg-orange-100"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="p-12 text-center border-orange-200">
          <Bell className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-orange-900 mb-2">No Notifications</h3>
          <p className="text-orange-700">
            {filter === 'unread'
              ? "You're all caught up! No unread notifications."
              : "You don't have any notifications yet."}
          </p>
        </Card>
      )}
    </div>
  );
}