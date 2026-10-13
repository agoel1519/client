const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'src/components/admin/AdminPageBuilder.jsx');
let content = fs.readFileSync(filepath, 'utf8');

const replacements = {
  'admin-content': 'builder-wrapper', // Wait, maybe I should just use admin-content because it is standard. Let's map JSX classes to what AdminPageBuilder.css and AdminLayout.css have.
  'page-header-simple': 'builder-header',
  'header-left-col': 'builder-header-left',
  'header-back-link': 'back-btn',
  'header-title-row': '',
  'header-main-title': '', // builder-header h1 will style it
  'header-actions-row': 'builder-header-actions',
  'btn-header-delete': 'btn-danger',
  'btn-header-preview': 'btn-secondary',
  'btn-header-save': 'btn-save',
  'top-tabs-nav-bar': 'builder-tabs',
  'top-tab-pill-btn': 'builder-tab',
  'builder-main-card': '', // no specific wrapper needed, or card-panel
  'section-hero-header': 'builder-section-header',
  'section-hero-title': '', // styled via builder-section-header h2
  'section-hero-desc': '', 
  'form-field-group': 'form-group',
  'field-label-clean': '', // form-group label
  'field-required-dot': '',
  'field-label-hint': 'help-text', // Or something
  'field-input-clean': 'form-input',
  'two-col-grid': 'builder-grid grid-2',
  'field-textarea-clean': 'form-textarea',
  'section-list-item': 'repeatable-item',
  'item-header-row': 'repeatable-item-header',
  'btn-remove-item': 'btn-danger',
  'btn-add-item': 'btn-secondary',
  'image-upload-box': 'image-upload-area',
  'img-preview-box': '',
  'btn-img-remove': 'btn-danger',
  'btn-add-section': 'btn-secondary',
  'custom-section-item': 'repeatable-item'
};

// Also we need to replace some of the generic wrapper tags
content = content.replace(/className=\"page-header-simple\"/g, 'className=\"builder-header\"');
content = content.replace(/className=\"header-left-col\"/g, 'className=\"builder-header-left\"');
content = content.replace(/className=\"header-back-link\"/g, 'className=\"back-btn\"');
content = content.replace(/className=\"header-main-title\"/g, '');
content = content.replace(/className=\"header-actions-row\"/g, 'className=\"builder-header-actions\"');
content = content.replace(/className=\"btn-header-delete\"/g, 'className=\"btn-danger\"');
content = content.replace(/className=\"btn-header-preview\"/g, 'className=\"btn-secondary\"');
content = content.replace(/className=\"btn-header-save\"/g, 'className=\"btn-save\"');
content = content.replace(/className=\"top-tabs-nav-bar\"/g, 'className=\"builder-tabs\"');
content = content.replace(/className=\`top-tab-pill-btn \$\{isActive \? \'active\' \: \'\'\}\`/g, 'className={`builder-tab ${isActive ? \'active\' : \'\'}`}');
content = content.replace(/className=\"builder-main-card\"/g, '');
content = content.replace(/className=\"section-hero-header\"/g, 'className=\"builder-section-header\"');
content = content.replace(/className=\"section-hero-title\"/g, '');
content = content.replace(/className=\"form-field-group\"/g, 'className=\"form-group\"');
content = content.replace(/className=\"field-label-clean\"/g, '');
content = content.replace(/className=\"field-input-clean\"/g, 'className=\"form-input\"');
content = content.replace(/className=\"field-textarea-clean\"/g, 'className=\"form-textarea\"');
content = content.replace(/className=\"two-col-grid\"/g, 'className=\"builder-grid grid-2\"');
content = content.replace(/className=\"section-list-item\"/g, 'className=\"repeatable-item\"');
content = content.replace(/className=\"item-header-row\"/g, 'className=\"builder-section-header\"');
content = content.replace(/className=\"btn-remove-item\"/g, 'className=\"btn-danger\"');
content = content.replace(/className=\"btn-add-item\"/g, 'className=\"btn-secondary\"');
content = content.replace(/className=\"image-upload-box\"/g, 'className=\"image-upload-area\"');
content = content.replace(/className=\"btn-add-section\"/g, 'className=\"btn-secondary\"');
content = content.replace(/className=\"custom-section-item\"/g, 'className=\"repeatable-item\"');
content = content.replace(/className=\"fade-in\"/g, 'className=\"builder-section\"');

fs.writeFileSync(filepath, content, 'utf8');
console.log('Done mapping classes in AdminPageBuilder.jsx');
