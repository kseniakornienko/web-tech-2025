if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Данные для меню согласно описанию
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

    // Создаем экземпляр ListItems и инициализируем его
    const items = new ListItems(document.getElementById('list-items'), data);
    items.render();
    items.init();
}

// Конструктор для создания меню
function ListItems(el, data) {
    this.el = el;
    this.data = data;

    // Инициализация обработчиков событий с использованием всплытия
    this.init = function() {
        // Используем всплытие событий - вешаем один обработчик на контейнер
        this.el.addEventListener('click', (event) => {
            const arrow = event.target.closest('.list-item__arrow');
            if (arrow) {
                const parentItem = arrow.closest('[data-parent]');
                if (parentItem) {
                    this.toggleItems(parentItem);
                }
            }
            
            // Также добавляем возможность клика по всей строке
            const inner = event.target.closest('.list-item__inner');
            if (inner) {
                const parentItem = inner.closest('[data-parent]');
                if (parentItem) {
                    this.toggleItems(parentItem);
                }
            }
        });
    };

    // Основной метод рендеринга
    this.render = function() {
        this.el.innerHTML = this.renderItem(this.data);
    };

    // Рекурсивный метод рендеринга элементов
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

        // Определяем классы в зависимости от наличия детей
        const itemClass = hasChildren ? 'list-item list-item_open' : 'list-item';
        const parentAttr = hasChildren ? 'data-parent' : '';
        
        // Стрелка показывается только если есть дети
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

    // Переключение состояния (раскрыть/свернуть)
    this.toggleItems = function(parent) {
        parent.classList.toggle('list-item_open');
    };
}