import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
import ListPost from "../../components/Post/ListPost";
import {Box} from "@mui/material";
import PostNormal from "../../components/Post/PostNormal";

const HomePage: React.FC = () => {
    return (
        <HomeLayout>
            <Box sx={{maxWidth: '680px', width: '680px'}}>
                <ListPost>
                    <PostNormal
                        postId={1}
                        time={'1 giờ trước'}
                        username={'Nguyễn Trương Anh Kiệt'}
                        content={'“Vì sao IU vẫn ngày càng trở nên nổi tiếng và thành công bất chấp những scandal chấn động trong quá khứ?\n' +
                            'Showbiz hàn được biết đến là vô cùng khắc khe và nghiệt ngã, công chúng hàn quốc có yêu cầu rất cao về chuẩn mực và hình tượng của người nghệ sĩ. Bất cứ hành động sai sót nào của nghệ sĩ/idol cũng đều bị công chúng đánh giá chỉ trích và tẩy chay thậm tệ. Hiếm khi có ai vượt qua và vực dậy được sự nghiệp sau những scandal tai tiếng của mình. IU thuộc về trường hợp hiếm hoi này, chẳng những sự nghiệp không chìm mà ngày càng đi lên, ngày càng có nhiều tiền bối hậu bối đồng nghiệp trong ngành bày tỏ sự yêu thích và nhắc đến tên của cô nhiều hơn, cô thậm chí được báo chí hàn quốc xếp vào top những người nổi tiếng uy tín nhất của showbiz (xếp #2 chỉ sau MC quốc dân Yoo Jae Suk). Nữ hoàng nhạc số, em gái quốc dân, quốc bảo âm sắc, ca sĩ quốc dân...là những biệt hiệu mà báo chí hàn quốc khen ngợi và nêu lên mỗi khi nhắc đến IU trong đề mục của mình. Vậy vì sao IU vẫn nổi tiếng và thành công bất chấp những scandal đình đám trong quá khứ. Nói đến đây thì mình liệt kê ra 2 scandal lớn nhất của IU:\n' +
                            '#1 Scandal lỡ tay đăng ảnh chụp với Eunhyuk (2012)\n' +
                            '#2 Scandal đình đám năm 2015: tranh cãi gay gắt về phốt **lita trong bài Zezé, những hình ảnh tục tĩu trong mv Twenty three. Năm đó Kbiz khơi lại vô vàn phốt của IU với các tiền bối và bạn đồng nghiệp trong quá khứ cùng scandal đăng ảnh với EH năm 2012, từ đó đồng loạt tẩy chay IU khỏi showbiz. Sự nghiệp của IU tưởng chừng như không còn cách nào có thể cứu vãn được nữa, bởi chỉ cần xuất hiện cái tên IU trên mặt báo là bên dưới comment tràn ngập những lời chỉ trích thậm tệ về IU. Ấy thế mà 2 năm sau (2017) cái tên IU đột nhiên chói sáng hơn bao giờ hết, cô comeback với full album thứ 4 - Pallete, thành công vô cùng rực rỡ, Through the night trở thành 1 trong 4 siêu hit có hơn 7M ULs trên melon. Kể từ đó đến nay IU tằng tằng chễm chệ trở thành cái tên hàng top trong Kpop bên cạnh những nhóm nhạc nổi tiếng khác. \n' +
                            'Lý giải cho sự thành công của IU hậu scandal trước nhất là khả năng viết lời và sáng tác nhạc của IU, chất lượng bài hát được đảm bảo cho mỗi lần comeback; các yếu tố sau đó là màu giọng đẹp, có nguồn tài nguyên tốt được hợp tác với idol hàng top như GD, Suga, đi đóng phim và gặt hái được 1 số thành công trong lĩnh vực phim ảnh... Như vậy có thể thấy IU dùng tài năng để vực dậy sự nghiệp của mình. Nhưng liệu như thế có đủ để dân Hàn yêu thích và ủng hộ cô nhiều đến vậy trong 1 thời gian dài? Vì sao từ việc tẩy chay ghét bỏ nặng nề sau đó công chúng hàn quốc lại đón nhận IU trở lại? Điểm lại loạt phốt nhỏ lẻ trong quá khứ có thể thấy đa phần là do IU vạ miệng, vô tình, xử sự kém (EQ thấp) với các tiền bối và bạn đồng nghiệp nên mới bị thêm thắt thêu dệt thành phốt. Scandal gây tranh cãi lớn nhất năm 2015, được coi là thời điểm đen tối nhất trong sự nghiệp của IU sau cùng cũng trôi vào dĩ vãng, ko còn ai nhắc đến vụ **lita, nếu có nhắc thì cũng bị chửi vì cố tình thêu dệt câu chuyện ko đúng sự thật và bị kiện. Chỉ còn scandal vô tình đăng ảnh chụp với Eunhyuk năm 2012 là 1 vết nhơ trong cuộc đời và sự nghiệp của IU vì cô đã làm liên lụy đến EH khiến anh bị chửi oan. Công ty quản lý của IU thời đó (Loen ent) đã thay mặt cô lên tiếng đính chính xin lỗi EH và fan của cả hai trước công chúng và báo chí. IU lúc đó ko xin lỗi EH 1 cách công khai mà chỉ chia sẻ là mình đã gọi điện xin lỗi EH. \n' +
                            'Sai lầm của IU trong quá khứ là như thế, nên cô đã hứng chịu những lời chỉ trích tẩy chay vô cùng gay gắt tại hàn quốc thời đó. Cô có lỗi với EH và đã trả giá cho sai lầm của mình. Thế nhưng có lỗi với 1 người không có nghĩa là nhân cách của IU vô cùng thối nát và tệ hại. Phải làm sao mà bao idol/người nổi tiếng hiện nay trong Kbiz từ tiền bối đến hậu bối đều yêu thích và chọn IU là hình mẫu lý tưởng của mình, phải làm sao mà hiện nay IU là 1 trong những ngôi sao được yêu mến nhất hàn quốc với quốc dân độ cực kỳ cao. Kể từ sau sai lầm thời trẻ, IU chuyển mình thay đổi trở nên chín chắn và trưởng thành hơn, biết sẻ chia và cho đi nhiều hơn, thường ủng hộ và ngầm pr sản phẩm âm nhạc/phim ảnh cho các đồng nghiệp, thường tặng quà cho fan hâm mộ và các đồng nghiệp, thường xuyên đóng góp thiện nguyện cho xã hội, giúp đỡ những người gặp khó khăn trong cộng đồng, truyền cảm hứng sống tốt cho nhiều người. IU đã thay đổi ngày một trở nên tốt hơn và cống hiến nhiều hơn cho xã hội.\n' +
                            'Như vậy, có thể thấy công chúng hàn quốc từng yêu thương cô nên ưu ái dành tặng danh hiệu em gái quốc dân, họ cũng sẵn sàng ghét bỏ đay nghiến và chỉ trích 1 cách cay đắng khi cô phạm sai lầm, và sau đó cũng chính công chúng hàn quốc đã đón nhận IU trở lại nhờ vào chất lượng âm nhạc và cách sống đẹp của cô sau này. “'}
                        image={'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/287682609_5071402476290958_8239100455644975051_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0debeb&_nc_ohc=RUTHUgwiidYAX_KGYCs&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_LViTou9e6P3LWK4iPMX7BukmweNHRhqw2ZsVSH-gRQg&oe=62B5757E'}
                    />
                    <PostNormal
                        postId={2}
                        time={'1 giờ trước'}
                        username={'Nguyễn Trương Anh Kiệt'}
                        content={'“Vì sao IU vẫn ngày càng trở nên nổi tiếng và thành công bất chấp những scandal chấn động trong quá khứ?\n' +
                            'Showbiz hàn được biết đến là vô cùng khắc khe và nghiệt ngã, công chúng hàn quốc có yêu cầu rất cao về chuẩn mực và hình tượng của người nghệ sĩ. Bất cứ hành động sai sót nào của nghệ sĩ/idol cũng đều bị công chúng đánh giá chỉ trích và tẩy chay thậm tệ. Hiếm khi có ai vượt qua và vực dậy được sự nghiệp sau những scandal tai tiếng của mình. IU thuộc về trường hợp hiếm hoi này, chẳng những sự nghiệp không chìm mà ngày càng đi lên, ngày càng có nhiều tiền bối hậu bối đồng nghiệp trong ngành bày tỏ sự yêu thích và nhắc đến tên của cô nhiều hơn, cô thậm chí được báo chí hàn quốc xếp vào top những người nổi tiếng uy tín nhất của showbiz (xếp #2 chỉ sau MC quốc dân Yoo Jae Suk). Nữ hoàng nhạc số, em gái quốc dân, quốc bảo âm sắc, ca sĩ quốc dân...là những biệt hiệu mà báo chí hàn quốc khen ngợi và nêu lên mỗi khi nhắc đến IU trong đề mục của mình. Vậy vì sao IU vẫn nổi tiếng và thành công bất chấp những scandal đình đám trong quá khứ. Nói đến đây thì mình liệt kê ra 2 scandal lớn nhất của IU:\n' +
                            '#1 Scandal lỡ tay đăng ảnh chụp với Eunhyuk (2012)\n' +
                            '#2 Scandal đình đám năm 2015: tranh cãi gay gắt về phốt **lita trong bài Zezé, những hình ảnh tục tĩu trong mv Twenty three. Năm đó Kbiz khơi lại vô vàn phốt của IU với các tiền bối và bạn đồng nghiệp trong quá khứ cùng scandal đăng ảnh với EH năm 2012, từ đó đồng loạt tẩy chay IU khỏi showbiz. Sự nghiệp của IU tưởng chừng như không còn cách nào có thể cứu vãn được nữa, bởi chỉ cần xuất hiện cái tên IU trên mặt báo là bên dưới comment tràn ngập những lời chỉ trích thậm tệ về IU. Ấy thế mà 2 năm sau (2017) cái tên IU đột nhiên chói sáng hơn bao giờ hết, cô comeback với full album thứ 4 - Pallete, thành công vô cùng rực rỡ, Through the night trở thành 1 trong 4 siêu hit có hơn 7M ULs trên melon. Kể từ đó đến nay IU tằng tằng chễm chệ trở thành cái tên hàng top trong Kpop bên cạnh những nhóm nhạc nổi tiếng khác. \n' +
                            'Lý giải cho sự thành công của IU hậu scandal trước nhất là khả năng viết lời và sáng tác nhạc của IU, chất lượng bài hát được đảm bảo cho mỗi lần comeback; các yếu tố sau đó là màu giọng đẹp, có nguồn tài nguyên tốt được hợp tác với idol hàng top như GD, Suga, đi đóng phim và gặt hái được 1 số thành công trong lĩnh vực phim ảnh... Như vậy có thể thấy IU dùng tài năng để vực dậy sự nghiệp của mình. Nhưng liệu như thế có đủ để dân Hàn yêu thích và ủng hộ cô nhiều đến vậy trong 1 thời gian dài? Vì sao từ việc tẩy chay ghét bỏ nặng nề sau đó công chúng hàn quốc lại đón nhận IU trở lại? Điểm lại loạt phốt nhỏ lẻ trong quá khứ có thể thấy đa phần là do IU vạ miệng, vô tình, xử sự kém (EQ thấp) với các tiền bối và bạn đồng nghiệp nên mới bị thêm thắt thêu dệt thành phốt. Scandal gây tranh cãi lớn nhất năm 2015, được coi là thời điểm đen tối nhất trong sự nghiệp của IU sau cùng cũng trôi vào dĩ vãng, ko còn ai nhắc đến vụ **lita, nếu có nhắc thì cũng bị chửi vì cố tình thêu dệt câu chuyện ko đúng sự thật và bị kiện. Chỉ còn scandal vô tình đăng ảnh chụp với Eunhyuk năm 2012 là 1 vết nhơ trong cuộc đời và sự nghiệp của IU vì cô đã làm liên lụy đến EH khiến anh bị chửi oan. Công ty quản lý của IU thời đó (Loen ent) đã thay mặt cô lên tiếng đính chính xin lỗi EH và fan của cả hai trước công chúng và báo chí. IU lúc đó ko xin lỗi EH 1 cách công khai mà chỉ chia sẻ là mình đã gọi điện xin lỗi EH. \n' +
                            'Như vậy, có thể thấy công chúng hàn quốc từng yêu thương cô nên ưu ái dành tặng danh hiệu em gái quốc dân, họ cũng sẵn sàng ghét bỏ đay nghiến và chỉ trích 1 cách cay đắng khi cô phạm sai lầm, và sau đó cũng chính công chúng hàn quốc đã đón nhận IU trở lại nhờ vào chất lượng âm nhạc và cách sống đẹp của cô sau này. “'}
                        image={'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/287682609_5071402476290958_8239100455644975051_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0debeb&_nc_ohc=RUTHUgwiidYAX_KGYCs&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_LViTou9e6P3LWK4iPMX7BukmweNHRhqw2ZsVSH-gRQg&oe=62B5757E'}
                    />
                    <PostNormal
                        postId={3}
                        time={'1 giờ trước'}
                        username={'Nguyễn Trương Anh Kiệt'}
                        content={'“Vì sao IU vẫn ngày càng trở nên nổi tiếng và thành công bất chấp những scandal chấn động trong quá khứ?\n' +
                            ' cho sự thành công của IU hậu scandal trước nhất là khả năng viết lời và sáng tác nhạc của IU, chất lượng bài hát được đảm bảo cho mỗi lần comeback; các yếu tố sau đó là màu giọng đẹp, có nguồn tài nguyên tốt được hợp tác với idol hàng top như GD, Suga, đi đóng phim và gặt hái được 1 số thành công trong lĩnh vực phim ảnh... Như vậy có thể thấy IU dùng tài năng để vực dậy sự nghiệp của mình. Nhưng liệu như thế có đủ để dân Hàn yêu thích và ủng hộ cô nhiều đến vậy trong 1 thời gian dài? Vì sao từ việc tẩy chay ghét bỏ nặng nề sau đó công chúng hàn quốc lại đón nhận IU trở lại? Điểm lại loạt phốt nhỏ lẻ trong quá khứ có thể thấy đa phần là do IU vạ miệng, vô tình, xử sự kém (EQ thấp) với các tiền bối và bạn đồng nghiệp nên mới bị thêm thắt thêu dệt thành phốt. Scandal gây tranh cãi lớn nhất năm 2015, được coi là thời điểm đen tối nhất trong sự nghiệp của IU sau cùng cũng trôi vào dĩ vãng, ko còn ai nhắc đến vụ **lita, nếu có nhắc thì cũng bị chửi vì cố tình thêu dệt câu chuyện ko đúng sự thật và bị kiện. Chỉ còn scandal vô tình đăng ảnh chụp với Eunhyuk năm 2012 là 1 vết nhơ trong cuộc đời và sự nghiệp của IU vì cô đã làm liên lụy đến EH khiến anh bị chửi oan. Công ty quản lý của IU thời đó (Loen ent) đã thay mặt cô lên tiếng đính chính xin lỗi EH và fan của cả hai trước công chúng và báo chí. IU lúc đó ko xin lỗi EH 1 cách công khai mà chỉ chia sẻ là mình đã gọi điện xin lỗi EH. \n' +
                            'Sai lầm của IU trong quá khứ là như thế, nên cô đã hứng chịu những lời chỉ trích tẩy chay vô cùng gay gắt tại hàn quốc thời đó. Cô có lỗi với EH và đã trả giá cho sai lầm của mình. Thế nhưng có lỗi với 1 người không có nghĩa là nhân cách của IU vô cùng thối nát và tệ hại. Phải làm sao mà bao idol/người nổi tiếng hiện nay trong Kbiz từ tiền bối đến hậu bối đều yêu thích và chọn IU là hình mẫu lý tưởng của mình, phải làm sao mà hiện nay IU là 1 trong những ngôi sao được yêu mến nhất hàn quốc với quốc dân độ cực kỳ cao. Kể từ sau sai lầm thời trẻ, IU chuyển mình thay đổi trở nên chín chắn và trưởng thành hơn, biết sẻ chia và cho đi nhiều hơn, thường ủng hộ và ngầm pr sản phẩm âm nhạc/phim ảnh cho các đồng nghiệp, thường tặng quà cho fan hâm mộ và các đồng nghiệp, thường xuyên đóng góp thiện nguyện cho xã hội, giúp đỡ những người gặp khó khăn trong cộng đồng, truyền cảm hứng sống tốt cho nhiều người. IU đã thay đổi ngày một trở nên tốt hơn và cống hiến nhiều hơn cho xã hội.\n' +
                            'Như vậy, có thể thấy công chúng hàn quốc từng yêu thương cô nên ưu ái dành tặng danh hiệu em gái quốc dân, họ cũng sẵn sàng ghét bỏ đay nghiến và chỉ trích 1 cách cay đắng khi cô phạm sai lầm, và sau đó cũng chính công chúng hàn quốc đã đón nhận IU trở lại nhờ vào chất lượng âm nhạc và cách sống đẹp của cô sau này. “'}
                        image={'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/287682609_5071402476290958_8239100455644975051_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0debeb&_nc_ohc=RUTHUgwiidYAX_KGYCs&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_LViTou9e6P3LWK4iPMX7BukmweNHRhqw2ZsVSH-gRQg&oe=62B5757E'}
                    />
                </ListPost>
            </Box>
        </HomeLayout>
    )
}

export default HomePage;