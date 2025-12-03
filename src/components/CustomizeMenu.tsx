import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Edit2, Trash2, Save, X, Upload, Download, FileSpreadsheet } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
}

export function CustomizeMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    // Load menu items from localStorage on mount
    const stored = localStorage.getItem('queueless_menu_items');
    if (stored) {
      return JSON.parse(stored);
    }
    // Default menu items
    return [
      {
        id: '1',
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk and foam',
        price: 5.00,
        category: 'Beverages',
        available: true,
        imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop',
      },
      {
        id: '2',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil',
        price: 15.00,
        category: 'Main Course',
        available: true,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      },
      {
        id: '3',
        name: 'Caesar Salad',
        description: 'Crisp romaine, parmesan, croutons, caesar dressing',
        price: 10.00,
        category: 'Appetizers',
        available: true,
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      },
      {
        id: '4',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 8.00,
        category: 'Desserts',
        available: true,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
      },
    ];
  });

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Main Course',
    available: true,
    imageUrl: '',
  });

  // Get all unique categories from menu items
  const allCategories = Array.from(new Set(menuItems.map(item => item.category)));
  
  // Default categories to show in dropdown if no items exist
  const defaultCategories = ['Beverages', 'Appetizers', 'Main Course', 'Desserts', 'Pizza'];
  
  // Combine and deduplicate categories
  const categories = Array.from(new Set([...defaultCategories, ...allCategories]));

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
    localStorage.setItem('queueless_menu_items', JSON.stringify(updatedItems));
  };

  const handleToggleAvailability = (id: string) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setMenuItems(updatedItems);
    localStorage.setItem('queueless_menu_items', JSON.stringify(updatedItems));
  };

  const handleSave = () => {
    let updatedItems: MenuItem[];
    if (editingItem) {
      updatedItems = menuItems.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      );
      setMenuItems(updatedItems);
      setEditingItem(null);
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...(formData as MenuItem),
      };
      updatedItems = [...menuItems, newItem];
      setMenuItems(updatedItems);
      setShowAddForm(false);
    }
    localStorage.setItem('queueless_menu_items', JSON.stringify(updatedItems));
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'Main Course',
      available: true,
      imageUrl: '',
    });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'Main Course',
      available: true,
      imageUrl: '',
    });
  };

  // Excel Import Handler
  const handleExcelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast.error('Please upload a valid Excel file (.xlsx, .xls, or .csv)');
      return;
    }

    // Read and parse the Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Dynamically import xlsx library
        import('xlsx').then((XLSX) => {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          
          const importedItems: MenuItem[] = [];
          
          // Loop through all sheets in the workbook
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
            
            // Skip empty sheets or sheets with only headers
            if (jsonData.length <= 1) return;
            
            // Get headers from first row
            const headers = jsonData[0].map((h: any) => String(h).toLowerCase());
            
            // Find column indices
            const nameIdx = headers.findIndex((h: string) => h.includes('name'));
            const descIdx = headers.findIndex((h: string) => h.includes('description') || h.includes('desc'));
            const priceIdx = headers.findIndex((h: string) => h.includes('price'));
            const availableIdx = headers.findIndex((h: string) => h.includes('available') || h.includes('status'));
            const imageIdx = headers.findIndex((h: string) => h.includes('image') || h.includes('url'));
            
            // Process data rows (skip header row)
            for (let i = 1; i < jsonData.length; i++) {
              const row = jsonData[i];
              
              // Skip empty rows
              if (!row || row.length === 0 || !row[nameIdx]) continue;
              
              const item: MenuItem = {
                id: Date.now().toString() + i + Math.random(),
                name: row[nameIdx] || 'Unnamed Item',
                description: row[descIdx] || '',
                price: parseFloat(row[priceIdx]) || 0,
                category: sheetName, // Use sheet name as category
                available: availableIdx >= 0 ? (String(row[availableIdx]).toLowerCase() === 'true' || row[availableIdx] === true) : true,
                imageUrl: row[imageIdx] || '',
              };
              
              importedItems.push(item);
            }
          });
          
          if (importedItems.length > 0) {
            // Add imported items to existing menu
            const updatedItems = [...menuItems, ...importedItems];
            setMenuItems(updatedItems);
            localStorage.setItem('queueless_menu_items', JSON.stringify(updatedItems));
            toast.success(`Successfully imported ${importedItems.length} menu items from ${workbook.SheetNames.length} ${workbook.SheetNames.length === 1 ? 'sheet' : 'sheets'}!`);
          } else {
            toast.error('No valid menu items found in the Excel file');
          }
        }).catch((error) => {
          console.error('Error loading xlsx library:', error);
          toast.error('Failed to process Excel file. Please try again.');
        });
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to read Excel file. Please check the file format.');
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read file. Please try again.');
    };
    
    reader.readAsBinaryString(file);

    // Reset the input
    event.target.value = '';
  };

  // Download Sample Excel Template
  const handleDownloadSample = () => {
    // Dynamically import xlsx library
    import('xlsx').then((XLSX) => {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      
      // Define sample data for each category/sheet
      const categories = {
        'Beverages': [
          ['Name', 'Description', 'Price', 'Available', 'Image URL'],
          ['Cappuccino', 'Rich espresso with steamed milk and foam', 5.00, true, 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400'],
          ['Latte', 'Espresso with steamed milk', 4.50, true, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'],
          ['Espresso', 'Strong black coffee', 3.00, true, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400'],
        ],
        'Appetizers': [
          ['Name', 'Description', 'Price', 'Available', 'Image URL'],
          ['Caesar Salad', 'Crisp romaine, parmesan, croutons, caesar dressing', 10.00, true, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'],
          ['Bruschetta', 'Toasted bread with tomatoes, basil, and garlic', 8.00, true, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400'],
          ['Mozzarella Sticks', 'Crispy fried mozzarella with marinara sauce', 9.00, true, 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400'],
        ],
        'Main Course': [
          ['Name', 'Description', 'Price', 'Available', 'Image URL'],
          ['Margherita Pizza', 'Fresh mozzarella, tomatoes, and basil', 15.00, true, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'],
          ['Grilled Salmon', 'Fresh Atlantic salmon with lemon butter', 22.00, true, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'],
          ['Beef Burger', 'Angus beef patty with lettuce, tomato, and cheese', 14.00, true, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'],
        ],
        'Desserts': [
          ['Name', 'Description', 'Price', 'Available', 'Image URL'],
          ['Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 8.00, true, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'],
          ['Chocolate Lava Cake', 'Warm chocolate cake with molten center', 9.00, true, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400'],
          ['Cheesecake', 'New York style cheesecake with berry compote', 7.50, true, 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400'],
        ],
        'Pizza': [
          ['Name', 'Description', 'Price', 'Available', 'Image URL'],
          ['Pepperoni Pizza', 'Classic pepperoni with mozzarella cheese', 16.00, true, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'],
          ['Veggie Supreme', 'Bell peppers, onions, mushrooms, olives', 15.50, true, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400'],
          ['BBQ Chicken Pizza', 'BBQ sauce, grilled chicken, red onions', 17.00, true, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'],
        ],
      };
      
      // Create a sheet for each category
      Object.entries(categories).forEach(([categoryName, data]) => {
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        
        // Set column widths
        worksheet['!cols'] = [
          { wch: 20 }, // Name
          { wch: 50 }, // Description
          { wch: 10 }, // Price
          { wch: 12 }, // Available
          { wch: 60 }, // Image URL
        ];
        
        XLSX.utils.book_append_sheet(workbook, worksheet, categoryName);
      });
      
      // Generate Excel file
      XLSX.writeFile(workbook, 'QueueLess_Menu_Template.xlsx');
      
      toast.success('Sample template downloaded! Each category is in a separate sheet.');
    }).catch((error) => {
      console.error('Error creating Excel file:', error);
      toast.error('Failed to create template. Please try again.');
    });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-orange-900 mb-2">Customize Menu</h1>
          <p className="text-orange-700">Manage your restaurant's menu items</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Download Sample Template Button */}
          <Button
            onClick={handleDownloadSample}
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Sample
          </Button>
          
          {/* Import Excel Button */}
          <Button
            onClick={() => document.getElementById('excel-upload')?.click()}
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Excel
          </Button>
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelImport}
            className="hidden"
          />
          
          {/* Add Menu Item Button */}
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Excel Import Info Card */}
      <Card className="p-4 mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex items-start gap-3">
          <FileSpreadsheet className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="text-orange-900 mb-1">Bulk Import Menu Items with Custom Categories</h4>
            <p className="text-sm text-orange-700">
              Download the sample template with separate sheets for each category (Beverages, Pizza, Desserts, etc.). 
              You can add your own custom sheets - each sheet name becomes a category! Fill in your menu items and upload. 
              Supported formats: .xlsx, .xls, .csv
            </p>
          </div>
        </div>
      </Card>

      {(showAddForm || editingItem) && (
        <Card className="p-6 mb-6 border-orange-200">
          <h3 className="text-orange-900 mb-4">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-orange-700 mb-2">Item Name</label>
              <Input
                placeholder="e.g., Cappuccino"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-700 mb-2">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g., 5.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="border-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-orange-700 mb-2">Image URL</label>
              <Input
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="border-orange-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-orange-700 mb-2">Description</label>
            <Textarea
              placeholder="Describe your menu item..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-orange-200"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-orange-200 text-orange-700"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Menu Items by Category */}
      {categories.map(category => {
        const categoryItems = menuItems.filter(item => item.category === category);
        if (categoryItems.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-orange-900">{category}</h2>
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-600">
                {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <div className="relative h-56 bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Price tag - new design */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <p className="text-orange-600">${item.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Availability badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={
                          item.available
                            ? 'bg-green-500 hover:bg-green-600 shadow-lg'
                            : 'bg-red-500 hover:bg-red-600 shadow-lg'
                        }
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-orange-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-orange-600 line-clamp-2">{item.description}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="flex-1 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAvailability(item.id)}
                        className={`flex-1 ${
                          item.available
                            ? 'border-orange-200 text-orange-700 hover:bg-orange-50'
                            : 'border-green-200 text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {item.available ? 'Hide' : 'Show'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {menuItems.length === 0 && (
        <Card className="p-12 text-center border-orange-200">
          <h3 className="text-orange-900 mb-2">No Menu Items Yet</h3>
          <p className="text-orange-700 mb-4">Add your first menu item to get started</p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        </Card>
      )}
    </div>
  );
}