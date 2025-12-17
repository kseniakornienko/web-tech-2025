if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },

                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    },

                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },

                    {
                        name: 'Vigro Glass',
                        hasChildren: false,
                        items: []
                    }
                ]
            },

            {
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },

                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },

                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    }
                ]
            }
        ]
    };

    const items = new ListItems(document.getElementById('list-items'), data);
    items.render();
    items.init();
}

function ListItems(el, data) {
    this.el = el;
    this.data = data;

    this.init = function() {
        this.el.addEventListener('click', (event) => {
            const arrow = event.target.closest('.list-item__arrow');
            if (arrow) {
                const parentItem = arrow.closest('[data-parent]');
                if (parentItem) {
                    this.toggleItems(parentItem);
                }
            }
            
            const inner = event.target.closest('.list-item__inner');
            if (inner) {
                const parentItem = inner.closest('[data-parent]');
                if (parentItem) {
                    this.toggleItems(parentItem);
                }
            }
        });
    };

    this.render = function() {
        this.el.innerHTML = this.renderItem(this.data);
    };

    this.renderItem = function(itemData) {
        const hasChildren = itemData.hasChildren && itemData.items && itemData.items.length > 0;
        
        let itemsHtml = '';
        if (hasChildren) {
            itemsHtml = '<div class="list-item__items">';
            itemData.items.forEach(child => {
                itemsHtml += this.renderItem(child);
            });
            itemsHtml += '</div>';
        }

        const itemClass = hasChildren ? 'list-item list-item_open' : 'list-item';
        const parentAttr = hasChildren ? 'data-parent' : '';
        
        const arrowHtml = hasChildren ? 
            '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down">' : 
            '<div class="list-item__arrow" style="visibility: hidden; width: 1em;"></div>';
        
        return `
            <div class="${itemClass}" ${parentAttr}>
                <div class="list-item__inner">
                    ${arrowHtml}
                    <img class="list-item__folder" src="img/folder.png" alt="folder">
                    <span>${itemData.name}</span>
                </div>
                ${itemsHtml}
            </div>
        `;
    };

    this.toggleItems = function(parent) {
        parent.classList.toggle('list-item_open');
    };
}