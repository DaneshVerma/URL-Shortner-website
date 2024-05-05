function myFunction(){
    let text = $("#result")[0]
    text.select()
    text.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(text.value)
    $(".copy-btn").text("Copied!");
}