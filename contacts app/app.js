$(document).ready(function () {
  // $(".sample").text("This is a sample html app.");
  $.ajax({
      url: 'https://randomuser.me/api/?results=20&inc=name,picture,id,cell&nat=in',
      dataType: 'json',
      success: function (data) {
          const chatList = $('.chat-list');
          const searchInput = $('#searchInput');

          chatList.html('<p class="chat-status-text" Loading people</p>');
          const renderChatItems = (people) => {
              chatList.empty();

              if(people.length === 0) {
                  chatList.append('<p class="chat-status-text"> No people found</p>');
              } else{
                  people.forEach((person) => {
                      const { name, picture, cell } = person;
                      const chatItem = `
                      <div class="chat-item">
                      <div class="chat-item_left">
                      <img src="${picture.large}" alt="${name.first} ${name.last}">
                      </div>
                      <div class="chat-item_right">
                      <p>${name.first} ${name.last}</p>
                      <p>${cell}</p>
                      </div>
                      </div>
                      `;
                      chatList.append(chatItem);
                  });
              }
          };
          renderChatItems(data.results);

          searchInput.on('input', function () {
              const searchTerm = $(this).val().toLowerCase();
              const filteredPeople = data.results.filter((person)=> {
                  const {name} = person;
                  const fullName = `${name.first} ${name.last}`.toLowerCase();
                  return fullName.includes(searchTerm);
              });
              renderChatItems(filteredPeople);
          });
          chatList.on('click', '.chat-item', function() {
              const chatItem = $(this);
              const name = chatItem.find('.chat-item_right p:first-child').text();
              const phone = chatItem.find('.chat-item_right p:last-child').text();
              console.log('Name:', name);
              console.log('Phone:', phone);
          });
      },
      error: function () {
          console.log('Error occured while fetching data.');
      }
  });
});
