import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { QrCode, Download, Plus, Trash2, Copy, Check } from 'lucide-react';
import QRCodeLib from 'qrcode';

interface QRCodeItem {
  id: string;
  tableName: string;
  tableNumber: number;
  qrUrl: string;
  createdDate: string;
}

export function MenuQR() {
  // Load QR codes from localStorage on mount
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>(() => {
    const stored = localStorage.getItem('queueless_qr_codes');
    if (stored) {
      return JSON.parse(stored);
    }
    // Default QR codes
    return [
      { id: '1', tableName: 'Table 1', tableNumber: 1, qrUrl: `${window.location.origin}/#/menu/1`, createdDate: '2025-11-15' },
      { id: '2', tableName: 'Table 2', tableNumber: 2, qrUrl: `${window.location.origin}/#/menu/2`, createdDate: '2025-11-15' },
      { id: '3', tableName: 'Table 3', tableNumber: 3, qrUrl: `${window.location.origin}/#/menu/3`, createdDate: '2025-11-16' },
      { id: '4', tableName: 'VIP Table', tableNumber: 4, qrUrl: `${window.location.origin}/#/menu/4`, createdDate: '2025-11-20' },
    ];
  });

  const [newTableName, setNewTableName] = useState('');
  const [newTableNumber, setNewTableNumber] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrCodeImages, setQrCodeImages] = useState<Record<string, string>>({});

  // Generate QR code images when qrCodes change
  useEffect(() => {
    const generateQRImages = async () => {
      const images: Record<string, string> = {};
      for (const qr of qrCodes) {
        try {
          const dataUrl = await QRCodeLib.toDataURL(qr.qrUrl, {
            width: 300,
            margin: 2,
            color: {
              dark: '#ea580c', // Orange-600
              light: '#ffffff'
            }
          });
          images[qr.id] = dataUrl;
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
      setQrCodeImages(images);
    };
    
    generateQRImages();
  }, [qrCodes]);

  const handleAddQR = () => {
    if (newTableName && newTableNumber) {
      const tableSlug = newTableNumber;
      // Use window.location.origin for current domain, works in all environments (local, production, etc.)
      const qrUrl = `${window.location.origin}/#/menu/${tableSlug}`;
      console.log('Generating QR code with URL:', qrUrl);
      
      const newQR: QRCodeItem = {
        id: Date.now().toString(),
        tableName: newTableName,
        tableNumber: parseInt(newTableNumber),
        qrUrl: qrUrl,
        createdDate: new Date().toISOString().split('T')[0],
      };
      const updatedQRs = [...qrCodes, newQR];
      setQrCodes(updatedQRs);
      // Save to localStorage and trigger storage event
      localStorage.setItem('queueless_qr_codes', JSON.stringify(updatedQRs));
      window.dispatchEvent(new Event('qr-codes-updated'));
      setNewTableName('');
      setNewTableNumber('');
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    const updatedQRs = qrCodes.filter(qr => qr.id !== id);
    setQrCodes(updatedQRs);
    // Save to localStorage and trigger storage event
    localStorage.setItem('queueless_qr_codes', JSON.stringify(updatedQRs));
    window.dispatchEvent(new Event('qr-codes-updated'));
  };

  const handleCopyUrl = async (id: string, url: string) => {
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        // Fallback method for older browsers or blocked clipboard API
        fallbackCopyTextToClipboard(url, id);
      }
    } catch (err) {
      // Clipboard API blocked, use fallback (this is expected in some environments)
      fallbackCopyTextToClipboard(url, id);
    }
  };

  const fallbackCopyTextToClipboard = (text: string, id: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        console.error('Fallback copy failed');
        alert('Failed to copy URL. Please copy it manually: ' + text);
      }
    } catch (err) {
      console.error('Fallback copy error:', err);
      alert('Failed to copy URL. Please copy it manually: ' + text);
    }
  };

  const handleDownloadQR = async (qr: QRCodeItem) => {
    try {
      const dataUrl = qrCodeImages[qr.id];
      if (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `QR-${qr.tableName.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-orange-900 mb-2">Menu QR Codes</h1>
          <p className="text-orange-700">Generate and manage QR codes for your tables</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New QR
        </Button>
      </div>

      {showAddForm && (
        <Card className="p-6 mb-6 border-orange-200">
          <h3 className="text-orange-900 mb-4">Create New QR Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-orange-700 mb-2">Table Name</label>
              <Input
                placeholder="e.g., Table 1"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="border-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-700 mb-2">Table Number</label>
              <Input
                type="number"
                placeholder="e.g., 1"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value)}
                className="border-orange-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddQR}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              Generate QR Code
            </Button>
            <Button
              onClick={() => setShowAddForm(false)}
              variant="outline"
              className="border-orange-200 text-orange-700"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr) => (
          <Card key={qr.id} className="p-6 border-orange-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-orange-900 mb-1">{qr.tableName}</h3>
                <p className="text-sm text-orange-600">Table #{qr.tableNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(qr.id)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* QR Code Image */}
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-8 mb-4 flex items-center justify-center">
              {qrCodeImages[qr.id] ? (
                <img 
                  src={qrCodeImages[qr.id]} 
                  alt={`QR Code for ${qr.tableName}`}
                  className="w-full max-w-[200px] h-auto"
                />
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <QrCode className="h-24 w-24 text-orange-600" />
                </div>
              )}
            </div>

            {/* URL */}
            <div className="bg-orange-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-orange-600 mb-1">QR Code URL</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-orange-900 truncate flex-1">{qr.qrUrl}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopyUrl(qr.id, qr.qrUrl)}
                  className="h-6 w-6 shrink-0"
                >
                  {copiedId === qr.id ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3 text-orange-600" />
                  )}
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleDownloadQR(qr)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={() => window.open(qr.qrUrl, '_blank')}
                variant="outline"
                className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Test Link
              </Button>
            </div>

            <p className="text-xs text-orange-600 mt-4">Created: {qr.createdDate}</p>
          </Card>
        ))}
      </div>

      {qrCodes.length === 0 && (
        <Card className="p-12 text-center border-orange-200">
          <QrCode className="h-16 w-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-orange-900 mb-2">No QR Codes Yet</h3>
          <p className="text-orange-700 mb-4">Create your first QR code to get started</p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New QR
          </Button>
        </Card>
      )}
    </div>
  );
}