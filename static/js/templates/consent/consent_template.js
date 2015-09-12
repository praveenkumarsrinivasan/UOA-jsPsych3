var consent_template = ' \
<h2><%- consent_title %></h2> \
<hr/> \
 \
<div class="legal well"> \
    <p> \
        <%- consent_description1 %> \
    </p> \
    <p> \
        <%- consent_description2 %> \
    </p> \
    <button type="button" class="btn btn-default btn-sm" onClick="window.print();"> \
        <span class="glyphicon glyphicon-print"></span> Print a copy of this \
    </button> \
</div> \
<br/> \
 \
<h4><%- consent_understanding %></h4> \
<button type="button" class="btn btn-primary btn-lg" onClick="startExp()"> \
    <span class="glyphicon glyphicon-ok"></span> I agree \
</button> \
<button type="button" class="btn btn-danger btn-lg" onClick="onExit()"> \
    <span class="glyphicon glyphicon-ban-circle"></span> No thanks, I do not want to do this HIT \
</button> \
';

